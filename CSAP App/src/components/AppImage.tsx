import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  ImageStyle,
  StyleSheet,
  View,
  ViewStyle,
  DimensionValue,
} from 'react-native';
import FastImage, {
  ImageStyle as FastImageStyle,
} from 'react-native-fast-image';
import { SvgXml, SvgProps } from 'react-native-svg';
import type { ComponentType } from 'react';
import LottieView from 'lottie-react-native';
import { IMAGES } from '../utils/assetsPath';

const styles = StyleSheet.create({
  lottieFill: {
    width: '100%',
    height: '100%',
  },
});

export type AppImageProps = {
  uri?: string | ImageSourcePropType | ComponentType<SvgProps> | React.FC<any>;
  width: DimensionValue;
  height: DimensionValue;
  style?: StyleProp<ImageStyle | ViewStyle>;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat';
  /** SVG fill tint; alias for overrideFillColorSvg */
  color?: string;
  overrideFillColorSvg?: string;
  overrideStrokeColorSvg?: string;
  forceCrispEdges?: boolean;
  loopCount?: number | string;
  onAnimationEnd?: (isCancelled: boolean) => void;
  isLottie?: boolean;
  loadingPlaceholder?: React.ReactNode;
  errorPlaceholder?: React.ReactNode;
  showPlaceholder?: boolean;
  [key: string]: unknown;
};

const isSvgString = (str: string) =>
  typeof str === 'string' &&
  (str.trim().startsWith('<svg') ||
    str.includes('<?xml') ||
    str.includes('<svg>'));

const isRemoteSvgUrl = (uri: string) => {
  const lower = uri.toLowerCase();
  const pathOnly = lower.split('?')[0].split('#')[0];
  return pathOnly.endsWith('.svg');
};

const isLottieFile = (uri: unknown): boolean => {
  if (!uri) {
    return false;
  }

  if (
    typeof uri === 'object' &&
    uri !== null &&
    !Array.isArray(uri) &&
    !React.isValidElement(uri)
  ) {
    const obj = uri as Record<string, unknown>;
    if (
      obj.v !== undefined ||
      obj.fr !== undefined ||
      obj.op !== undefined ||
      obj.ip !== undefined
    ) {
      return true;
    }
  }

  if (typeof uri === 'string') {
    const lowerUri = uri.toLowerCase();
    const pathOnly = lowerUri.split('?')[0].split('#')[0];
    return (
      pathOnly.endsWith('.json') ||
      pathOnly.endsWith('.lottie') ||
      lowerUri.includes('lottie')
    );
  }

  return false;
};

const replaceSvgColors = (
  svgContent: string,
  fillColor?: string,
  strokeColor?: string,
  forceCrispEdges?: boolean,
) => {
  let xml = svgContent;
  if (fillColor) {
    xml = xml.replace(/fill="[^"]*"/g, `fill="${fillColor}"`);
  }
  if (strokeColor) {
    xml = xml.replace(/stroke="[^"]*"/g, `stroke="${strokeColor}"`);
  }
  if (forceCrispEdges) {
    const sharpEdgeAttrs =
      'shape-rendering="crispEdges" stroke-linecap="square" stroke-linejoin="miter" stroke-miterlimit="10"';
    if (!xml.includes('shape-rendering') && !xml.includes('shapeRendering')) {
      xml = xml.replace(/<svg([^>]*)>/i, (match, attrs) => {
        if (
          !attrs.includes('shape-rendering') &&
          !attrs.includes('shapeRendering')
        ) {
          return `<svg${attrs} ${sharpEdgeAttrs}>`;
        }
        return match;
      });
    }
  }
  return xml;
};

const getPreserveAspectRatio = (resizeMode?: string) => {
  switch (resizeMode) {
    case 'contain':
      return 'xMidYMid meet';
    case 'cover':
      return 'xMidYMid slice';
    case 'stretch':
      return 'none';
    case 'repeat':
      return 'xMidYMid meet';
    default:
      return 'xMidYMid meet';
  }
};

const mapResizeModeForLottie = (
  mode?: AppImageProps['resizeMode'],
): 'cover' | 'contain' => {
  switch (mode) {
    case 'cover':
      return 'cover';
    case 'contain':
      return 'contain';
    default:
      return 'contain';
  }
};

function toSvgSize(value: DimensionValue): string | number | undefined {
  if (value === null || value === undefined) {
    return undefined;
  }
  return value as string | number;
}

const toFastImageResizeMode = (
  mode?: string,
): 'contain' | 'cover' | 'stretch' | 'center' => {
  if (mode === 'repeat') {
    return 'contain';
  }
  if (mode === 'cover' || mode === 'stretch') {
    return mode;
  }
  return 'contain';
};

const isRasterImageUri = (
  resource: AppImageProps['uri'],
  isLottie: boolean,
  isRemoteSvg: boolean,
): boolean =>
  !isLottie &&
  !isRemoteSvg &&
  (typeof resource === 'number' ||
    (typeof resource === 'string' && !isSvgString(resource)));

const isInstantRasterImage = (resource: AppImageProps['uri']): boolean => {
  if (typeof resource === 'number') {
    return true;
  }
  if (typeof resource === 'string') {
    return (
      resource.startsWith('file://') ||
      (!resource.startsWith('http') && !resource.startsWith('//'))
    );
  }
  return false;
};

const APP_IMAGE_KNOWN_PROP_KEYS = new Set([
  'uri',
  'width',
  'height',
  'style',
  'resizeMode',
  'color',
  'overrideFillColorSvg',
  'overrideStrokeColorSvg',
  'forceCrispEdges',
  'loadingPlaceholder',
  'errorPlaceholder',
  'loopCount',
  'onAnimationEnd',
  'isLottie',
  'showPlaceholder',
]);

const flattenStyleKey = (style?: StyleProp<ImageStyle | ViewStyle>): string => {
  if (style == null || style === false) {
    return '';
  }
  try {
    return JSON.stringify(StyleSheet.flatten(style));
  } catch {
    return '';
  }
};

const stableNonFunctionExtraPropsKey = (props: AppImageProps): string => {
  const keys = Object.keys(props)
    .filter(
      key =>
        !APP_IMAGE_KNOWN_PROP_KEYS.has(key) &&
        typeof props[key] !== 'function',
    )
    .sort();
  if (keys.length === 0) {
    return '';
  }
  const snapshot: Record<string, unknown> = {};
  for (const key of keys) {
    snapshot[key] = props[key];
  }
  try {
    return JSON.stringify(snapshot);
  } catch {
    return keys.join(',');
  }
};

const appImagePropsAreEqual = (
  prev: AppImageProps,
  next: AppImageProps,
): boolean =>
  prev.uri === next.uri &&
  prev.width === next.width &&
  prev.height === next.height &&
  prev.resizeMode === next.resizeMode &&
  prev.color === next.color &&
  prev.overrideFillColorSvg === next.overrideFillColorSvg &&
  prev.overrideStrokeColorSvg === next.overrideStrokeColorSvg &&
  prev.forceCrispEdges === next.forceCrispEdges &&
  prev.loopCount === next.loopCount &&
  prev.isLottie === next.isLottie &&
  prev.showPlaceholder === next.showPlaceholder &&
  prev.loadingPlaceholder === next.loadingPlaceholder &&
  prev.errorPlaceholder === next.errorPlaceholder &&
  flattenStyleKey(prev.style) === flattenStyleKey(next.style) &&
  stableNonFunctionExtraPropsKey(prev) ===
    stableNonFunctionExtraPropsKey(next);

const fetchText = async (uri: string): Promise<string> => {
  const response = await fetch(uri);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch SVG: ${uri} - Status: ${response.status}`,
    );
  }
  const text = await response.text();
  if (!text || !text.trim()) {
    throw new Error(`Empty response from SVG URL: ${uri}`);
  }
  return text;
};

const DefaultFallbackImage = ({
  width,
  height,
  style,
  resizeMode = 'contain',
}: {
  width: DimensionValue;
  height: DimensionValue;
  style?: StyleProp<ImageStyle | ViewStyle>;
  resizeMode?: AppImageProps['resizeMode'];
}) => (
  <Image
    source={IMAGES.placeholder}
    style={[{ width, height }, style] as StyleProp<ImageStyle>}
    resizeMode={resizeMode}
  />
);

const renderLocalSvg = (
  SvgComponent: React.FC<any>,
  width: DimensionValue,
  height: DimensionValue,
  resizeMode?: string,
  fillColor?: string,
  strokeColor?: string,
  style?: StyleProp<ViewStyle>,
  extraProps?: Record<string, unknown>,
) => {
  const svgProps = {
    width: toSvgSize(width),
    height: toSvgSize(height),
    preserveAspectRatio: getPreserveAspectRatio(resizeMode),
    shapeRendering: 'crispEdges' as const,
    strokeLinecap: 'square' as const,
    strokeLinejoin: 'miter' as const,
    strokeMiterlimit: 10,
    ...extraProps,
    style,
  } as SvgProps;
  if (fillColor) {
    (svgProps as SvgProps & { fill?: string }).fill = fillColor;
  }
  if (strokeColor) {
    (svgProps as SvgProps & { stroke?: string }).stroke = strokeColor;
  }
  return <SvgComponent {...svgProps} />;
};

const RemoteUriFastImage = React.memo(
  function RemoteUriFastImage({
    uri,
    width,
    height,
    style,
    resizeMode,
    extraProps,
  }: {
    uri: string;
    width: DimensionValue;
    height: DimensionValue;
    style?: StyleProp<ImageStyle | ViewStyle>;
    resizeMode?: string;
    extraProps?: Record<string, unknown>;
  }) {
    const extraPropsRef = useRef(extraProps);
    extraPropsRef.current = extraProps;

    const stableOnLoad = useCallback(() => {
      const fn = extraPropsRef.current?.onLoad;
      if (typeof fn === 'function') {
        (fn as () => void)();
      }
    }, []);

    const stableOnError = useCallback((event?: unknown) => {
      const fn = extraPropsRef.current?.onError;
      if (typeof fn === 'function') {
        (fn as (e?: unknown) => void)(event);
      }
    }, []);

    const source = useMemo(
      () => ({
        uri,
        priority: FastImage.priority.normal,
        cache: FastImage.cacheControl.immutable,
      }),
      [uri],
    );

    const flatStyleKey = flattenStyleKey(style);

    const combinedStyle = useMemo(() => {
      const base = { width, height } as FastImageStyle;
      if (style == null || style === false) {
        return base;
      }
      return { ...base, ...StyleSheet.flatten(style) } as FastImageStyle;
    }, [width, height, flatStyleKey]);

    const fastMode = toFastImageResizeMode(resizeMode);

    return (
      <FastImage
        style={combinedStyle as StyleProp<FastImageStyle>}
        source={source}
        resizeMode={FastImage.resizeMode[fastMode]}
        onLoad={stableOnLoad}
        onError={
          stableOnError as React.ComponentProps<typeof FastImage>['onError']
        }
      />
    );
  },
  (prev, next) =>
    prev.uri === next.uri &&
    prev.width === next.width &&
    prev.height === next.height &&
    prev.resizeMode === next.resizeMode &&
    flattenStyleKey(prev.style) === flattenStyleKey(next.style),
);

const renderResource = (
  resource: unknown,
  width: DimensionValue,
  height: DimensionValue,
  style?: StyleProp<ViewStyle | ImageStyle>,
  resizeMode?: AppImageProps['resizeMode'],
  fillColor?: string,
  strokeColor?: string,
  extraProps?: Record<string, unknown>,
  forceCrispEdges?: boolean,
) => {
  if (!resource) {
    return <View style={[{ width, height } as ViewStyle, style]} />;
  }

  if (React.isValidElement(resource)) {
    return resource;
  }

  if (typeof resource === 'function') {
    return renderLocalSvg(
      resource as React.FC<any>,
      width,
      height,
      resizeMode,
      fillColor,
      strokeColor,
      style,
      extraProps,
    );
  }

  if (typeof resource === 'string' && isSvgString(resource)) {
    const xml = replaceSvgColors(
      resource,
      fillColor,
      strokeColor,
      forceCrispEdges,
    );
    return (
      <SvgXml
        xml={xml}
        width={toSvgSize(width)}
        height={toSvgSize(height)}
        preserveAspectRatio={getPreserveAspectRatio(resizeMode)}
        {...(forceCrispEdges
          ? {
              shapeRendering: 'crispEdges',
              strokeLinecap: 'square',
              strokeLinejoin: 'miter',
              strokeMiterlimit: 10,
            }
          : undefined)}
        {...extraProps}
      />
    );
  }

  if (typeof resource === 'string' || typeof resource === 'number') {
    const isRemote =
      typeof resource === 'string' && !resource.startsWith('file://');
    if (isRemote) {
      return (
        <RemoteUriFastImage
          uri={resource}
          width={width}
          height={height}
          style={style}
          resizeMode={resizeMode}
          extraProps={extraProps}
        />
      );
    }
    return (
      <Image
        source={resource as ImageSourcePropType}
        style={[{ width, height }, style] as StyleProp<ImageStyle>}
        resizeMode={resizeMode}
        {...extraProps}
      />
    );
  }

  return <View style={[{ width, height } as ViewStyle, style]} />;
};

const AppImage: React.FC<AppImageProps> = ({
  uri,
  width,
  height,
  style,
  resizeMode = 'contain',
  color,
  overrideFillColorSvg,
  overrideStrokeColorSvg,
  forceCrispEdges,
  loadingPlaceholder,
  errorPlaceholder,
  loopCount,
  onAnimationEnd,
  isLottie: explicitIsLottie,
  showPlaceholder = true,
  ...extraProps
}) => {
  const fillColor = overrideFillColorSvg ?? color;
  const extraPropsRef = useRef(extraProps);
  extraPropsRef.current = extraProps;

  const isRemoteSvg =
    typeof uri === 'string' && isRemoteSvgUrl(uri);
  const isLottie = Boolean(explicitIsLottie || isLottieFile(uri));
  const isRasterImage = isRasterImageUri(uri, isLottie, isRemoteSvg);
  const isInstantImage = isRasterImage && isInstantRasterImage(uri);

  const onAnimationEndRef = useRef(onAnimationEnd);
  onAnimationEndRef.current = onAnimationEnd;

  const handleRasterLoad = useCallback((event?: unknown) => {
    setImageLoaded(true);
    const fn = extraPropsRef.current?.onLoad;
    if (typeof fn === 'function') {
      fn(event);
    }
  }, []);

  const handleRasterError = useCallback((event?: unknown) => {
    setImageLoadError(true);
    const fn = extraPropsRef.current?.onError;
    if (typeof fn === 'function') {
      fn(event);
    }
  }, []);

  const nonFunctionExtraPropsKey = (() => {
    const snapshot: Record<string, unknown> = {};
    for (const key of Object.keys(extraProps)) {
      if (typeof extraProps[key] !== 'function') {
        snapshot[key] = extraProps[key];
      }
    }
    try {
      return JSON.stringify(snapshot);
    } catch {
      return Object.keys(snapshot).join(',');
    }
  })();

  const rasterExtraProps = useMemo(() => {
    const merged: Record<string, unknown> = {
      onLoad: handleRasterLoad,
      onError: handleRasterError,
    };
    const current = extraPropsRef.current;
    if (current) {
      for (const key of Object.keys(current)) {
        if (
          key !== 'onLoad' &&
          key !== 'onError' &&
          typeof current[key] !== 'function'
        ) {
          merged[key] = current[key];
        }
      }
    }
    return merged;
  }, [handleRasterLoad, handleRasterError, nonFunctionExtraPropsKey]);

  const [loading, setLoading] = useState(isRemoteSvg);
  const [error, setError] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(isInstantImage);
  const [svgXml, setSvgXml] = useState<string | null>(null);
  const [lottieData, setLottieData] = useState<unknown>(null);
  const [currentLoop, setCurrentLoop] = useState(0);
  const [animationFinished, setAnimationFinished] = useState(false);
  const [lottiePlayKey, setLottiePlayKey] = useState(0);
  const lottieRef = useRef<LottieView>(null);

  useEffect(() => {
    if (isRemoteSvg && typeof uri === 'string') {
      setLoading(true);
      setError(false);
      fetchText(uri)
        .then(text => {
          if (text && text.trim()) {
            const xml = replaceSvgColors(
              text,
              fillColor,
              overrideStrokeColorSvg,
              forceCrispEdges,
            );
            setSvgXml(xml);
            setError(false);
          } else {
            setError(true);
          }
        })
        .catch(() => {
          setError(true);
        })
        .finally(() => setLoading(false));
    } else if (isLottie && typeof uri === 'string') {
      setLottieData({ uri });
      setLoading(false);
      setError(false);
      setAnimationFinished(false);
      setCurrentLoop(0);
    } else if (
      isLottie &&
      (typeof uri === 'object' || typeof uri === 'number')
    ) {
      setLottieData(uri);
      setLoading(false);
      setError(false);
      setAnimationFinished(false);
      setCurrentLoop(0);
    } else {
      setSvgXml(null);
      setLottieData(null);
      setLoading(false);
      setError(false);
      setAnimationFinished(false);
      setCurrentLoop(0);
    }
  }, [
    uri,
    fillColor,
    overrideStrokeColorSvg,
    forceCrispEdges,
    isRemoteSvg,
    isLottie,
  ]);

  useEffect(() => {
    if (isLottie) {
      setCurrentLoop(0);
      setAnimationFinished(false);
      setLottiePlayKey(0);
    }
    setImageLoadError(false);
    setImageLoaded(isInstantRasterImage(uri));
  }, [uri, isLottie]);

  useEffect(() => {
    if (!isRasterImage || !isInstantImage) {
      return;
    }
    const externalOnLoad = extraPropsRef.current?.onLoad;
    if (typeof externalOnLoad === 'function') {
      externalOnLoad({});
    }
  }, [isRasterImage, isInstantImage, uri]);

  const normalizedLoopCount = (() => {
    const parsed =
      typeof loopCount === 'string'
        ? parseInt(loopCount, 10)
        : typeof loopCount === 'number'
          ? loopCount
          : undefined;
    if (parsed === undefined || Number.isNaN(parsed)) {
      return undefined;
    }
    if (parsed < 0) {
      return undefined;
    }
    return Math.floor(parsed);
  })();

  const renderPlaceholder = (placeholder: React.ReactNode) =>
    renderResource(
      placeholder,
      width,
      height,
      style,
      resizeMode,
      fillColor,
      overrideStrokeColorSvg,
      extraProps as Record<string, unknown>,
      forceCrispEdges,
    );

  const renderDefaultFallback = () => (
    <DefaultFallbackImage
      width={width}
      height={height}
      style={style}
      resizeMode={resizeMode}
    />
  );

  const handleAnimationFinish = (isCancelled: boolean) => {
    if (isCancelled) {
      onAnimationEndRef.current?.(true);
      return;
    }

    const nextLoop = currentLoop + 1;
    const maxLoops =
      normalizedLoopCount !== undefined ? normalizedLoopCount : Infinity;
    if (nextLoop >= maxLoops) {
      setAnimationFinished(true);
      setCurrentLoop(nextLoop);
      onAnimationEndRef.current?.(false);
    } else {
      setCurrentLoop(nextLoop);
      setLottiePlayKey(prev => prev + 1);
    }
  };

  if (!uri && showPlaceholder) {
    return renderDefaultFallback();
  }

  if (loading) {
    return loadingPlaceholder
      ? renderPlaceholder(loadingPlaceholder)
      : <View style={[{ width, height }, style]} />;
  }

  if (error || imageLoadError) {
    if (errorPlaceholder) {
      return renderPlaceholder(errorPlaceholder);
    }
    return renderDefaultFallback();
  }

  const imageExtraProps = isRasterImage
    ? rasterExtraProps
    : (extraProps as Record<string, unknown>);

  if (isLottie && lottieData) {
    const lottieExtraProps = { ...(extraProps || {}) } as Record<
      string,
      unknown
    >;
    const extraOnAnimationFinish = lottieExtraProps.onAnimationFinish;
    const extraOnLoad = lottieExtraProps.onLoad;
    const extraOnAnimationLoaded = lottieExtraProps.onAnimationLoaded;
    delete lottieExtraProps.loop;
    delete lottieExtraProps.autoPlay;
    delete lottieExtraProps.onAnimationFinish;
    delete lottieExtraProps.onLoad;
    delete lottieExtraProps.onAnimationLoaded;

    const shouldLoop = animationFinished
      ? false
      : normalizedLoopCount === undefined;

    return (
      <View style={[{ width, height }, style]}>
        <LottieView
          resizeMode={mapResizeModeForLottie(resizeMode)}
          key={lottiePlayKey}
          ref={lottieRef}
          source={lottieData as LottieView['props']['source']}
          autoPlay={
            !animationFinished &&
            (normalizedLoopCount === undefined || normalizedLoopCount > 0)
          }
          loop={shouldLoop}
          style={styles.lottieFill}
          onAnimationFinish={(isCancelled: boolean) => {
            handleAnimationFinish(isCancelled);
            if (typeof extraOnAnimationFinish === 'function') {
              extraOnAnimationFinish(isCancelled);
            }
          }}
          onAnimationLoaded={() => {
            if (typeof extraOnLoad === 'function') {
              (extraOnLoad as () => void)();
            }
            if (typeof extraOnAnimationLoaded === 'function') {
              (extraOnAnimationLoaded as () => void)();
            }
          }}
          onAnimationFailure={() => {
            setError(true);
          }}
          {...lottieExtraProps}
        />
      </View>
    );
  }

  if (isRemoteSvg && svgXml) {
    return renderResource(
      svgXml,
      width,
      height,
      style,
      resizeMode,
      fillColor,
      overrideStrokeColorSvg,
      extraProps as Record<string, unknown>,
      forceCrispEdges,
    );
  }

  if (isRasterImage) {
    const showLoadingSlot = !imageLoaded && !imageLoadError;
    return (
      <View style={[{ width, height, overflow: 'hidden' }, style]}>
        {showLoadingSlot ? (
          loadingPlaceholder ? (
            renderPlaceholder(loadingPlaceholder)
          ) : (
            <View style={{ width, height }} />
          )
        ) : null}
        <View
          style={[
            StyleSheet.absoluteFill,
            { opacity: imageLoaded ? 1 : 0 },
          ]}
          pointerEvents={imageLoaded ? 'auto' : 'none'}
        >
          {renderResource(
            uri,
            width,
            height,
            undefined,
            resizeMode,
            fillColor,
            overrideStrokeColorSvg,
            imageExtraProps,
            forceCrispEdges,
          )}
        </View>
      </View>
    );
  }

  return renderResource(
    uri,
    width,
    height,
    style,
    resizeMode,
    fillColor,
    overrideStrokeColorSvg,
    imageExtraProps,
    forceCrispEdges,
  );
};

export default React.memo(AppImage, appImagePropsAreEqual);
