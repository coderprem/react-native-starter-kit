import {useEffect, useState} from 'react';
import {AccessibilityInfo, AccessibilityRole, AccessibilityState} from 'react-native';
import { IS_ANDROID } from './CommonUtil';

type AccessibleRole = AccessibilityRole | 'none';

export interface accessibleStringObj {
  label: string;
  hint?: string;
}

interface AccessibilityProps {
  accessible: boolean;
  accessibilityLabel: string;
  accessibilityHint?: string;
  accessibilityRole?: AccessibleRole;
  accessibilityState?: AccessibilityState;
}

const buildProps = (
  label: string,
  hint?: string,
  role?: AccessibleRole,
  state?: AccessibilityState,
): AccessibilityProps => {
  const props: AccessibilityProps = {
    accessible: true,
    accessibilityLabel: label,
  };
  if (hint) {
    props.accessibilityHint = hint;
  }
  if (role) {
    props.accessibilityRole = role;
  }
  if (state) {
    props.accessibilityState = state;
  }
  return props;
};

// Role: none
export const accessibleInput = (
  obj: accessibleStringObj,
): AccessibilityProps => {
  return buildProps(obj.label, obj.hint, 'none');
};

// Role: button
export const accessibleButton = (
  obj: accessibleStringObj,
  state?: AccessibilityState,
): AccessibilityProps => {
  return buildProps(obj.label, obj.hint, 'button', state);
};

// Role: togglebutton
export const accessibleToggleButton = (
  obj: accessibleStringObj,
  state?: AccessibilityState,
): AccessibilityProps => {
  return buildProps(obj.label, obj.hint, 'togglebutton', state);
};

// Role: link
export const accessibleLink = (
  obj: accessibleStringObj,
): AccessibilityProps => {
  return buildProps(obj.label, obj.hint, 'link');
};

// Role: search
export const accessibleSearch = (
  obj: accessibleStringObj,
): AccessibilityProps => {
  return buildProps(obj.label, obj.hint, 'search');
};

// Role: image
export const accessibleImage = (
  obj: accessibleStringObj,
): AccessibilityProps => {
  return buildProps(obj.label, obj.hint, 'image');
};

// Role: keyboardkey
export const accessibleKeyboardKey = (
  obj: accessibleStringObj,
): AccessibilityProps => {
  return buildProps(obj.label, obj.hint, 'keyboardkey');
};

// Role: text
export const accessibleText = (
  obj: accessibleStringObj,
): AccessibilityProps => {
  return buildProps(obj.label, obj.hint, 'text');
};

// Role: adjustable
export const accessibleAdjustable = (
  obj: accessibleStringObj,
): AccessibilityProps => {
  return buildProps(obj.label, obj.hint, 'adjustable');
};

// Role: imagebutton
export const accessibleImageButton = (
  obj: accessibleStringObj,
  state?: AccessibilityState,
): AccessibilityProps => {
  return buildProps(obj.label, obj.hint, 'imagebutton', state);
};

// Role: header
export const accessibleHeader = (
  obj: accessibleStringObj,
): AccessibilityProps => {
  return buildProps(obj.label, obj.hint, 'header');
};

// Role: summary
export const accessibleSummary = (
  obj: accessibleStringObj,
): AccessibilityProps => {
  return buildProps(obj.label, obj.hint, 'summary');
};

// Role: alert
export const accessibleAlert = (
  obj: accessibleStringObj,
): AccessibilityProps => {
  return buildProps(obj.label, obj.hint, 'alert');
};

// Role: checkbox
export const accessibleCheckbox = (
  obj: accessibleStringObj,
  checked: boolean,
): AccessibilityProps => {
  return buildProps(obj.label, obj.hint, 'checkbox', {checked});
};

// Role: combobox
export const accessibleCombobox = (
  obj: accessibleStringObj,
  expanded?: boolean,
): AccessibilityProps => {
  return buildProps(
    obj.label,
    obj.hint,
    'combobox',
    expanded !== undefined ? {expanded} : undefined,
  );
};

// Role: menu
export const accessibleMenu = (
  obj: accessibleStringObj,
): AccessibilityProps => {
  return buildProps(obj.label, obj.hint, 'menu');
};

// Role: menubar
export const accessibleMenubar = (
  obj: accessibleStringObj,
): AccessibilityProps => {
  return buildProps(obj.label, obj.hint, 'menubar');
};

// Role: menuitem
export const accessibleMenuItem = (
  obj: accessibleStringObj,
): AccessibilityProps => {
  return buildProps(obj.label, obj.hint, 'menuitem');
};

// Role: progressbar
export const accessibleProgressbar = (
  obj: accessibleStringObj,
): AccessibilityProps => {
  return buildProps(obj.label, obj.hint, 'progressbar');
};

// Role: radio
export const accessibleRadio = (
  obj: accessibleStringObj,
  checked: boolean,
): AccessibilityProps => {
  return buildProps(obj.label, obj.hint, 'radio', {checked});
};

// Role: radiogroup
export const accessibleRadioGroup = (
  obj: accessibleStringObj,
): AccessibilityProps => {
  return buildProps(obj.label, obj.hint, 'radiogroup');
};

// Role: scrollbar
export const accessibleScrollbar = (
  obj: accessibleStringObj,
): AccessibilityProps => {
  return buildProps(obj.label, obj.hint, 'scrollbar');
};

// Role: spinbutton
export const accessibleSpinButton = (
  obj: accessibleStringObj,
): AccessibilityProps => {
  return buildProps(obj.label, obj.hint, 'spinbutton');
};

// Role: switch
export const accessibleSwitch = (
  obj: accessibleStringObj,
  checked: boolean,
): AccessibilityProps => {
  return buildProps(obj.label, obj.hint, 'switch', {checked});
};

// Role: tab
export const accessibleTab = (
  obj: accessibleStringObj,
  selected?: boolean,
): AccessibilityProps => {
  return buildProps(
    obj.label,
    obj.hint,
    'tab',
    selected !== undefined ? {selected} : undefined,
  );
};

// Role: tabbar
export const accessibleTabbar = (
  obj: accessibleStringObj,
): AccessibilityProps => {
  return buildProps(obj.label, obj.hint, 'tabbar');
};

// Role: tablist
export const accessibleTablist = (
  obj: accessibleStringObj,
): AccessibilityProps => {
  return buildProps(obj.label, obj.hint, 'tablist');
};

// Role: timer
export const accessibleTimer = (
  obj: accessibleStringObj,
): AccessibilityProps => {
  return buildProps(obj.label, obj.hint, 'timer');
};

// Role: list
export const accessibleList = (
  obj: accessibleStringObj,
): AccessibilityProps => {
  return buildProps(obj.label, obj.hint, 'list');
};

// Role: toolbar
export const accessibleToolbar = (
  obj: accessibleStringObj,
): AccessibilityProps => {
  return buildProps(obj.label, obj.hint, 'toolbar');
};

/** TalkBack / VoiceOver on — use to pause autoplay and auto-advance. */
export const useIsScreenReaderOn = (): boolean => {
  const [isScreenReaderOn, setIsScreenReaderOn] = useState(false);

  useEffect(() => {
    const refresh = () => {
      AccessibilityInfo.isScreenReaderEnabled().then(enabled => {
        if (enabled) {
          setIsScreenReaderOn(true);
          return;
        }
        if (IS_ANDROID) {
          AccessibilityInfo.isAccessibilityServiceEnabled()
            .then(setIsScreenReaderOn)
            .catch(() => setIsScreenReaderOn(false));
          return;
        }
        setIsScreenReaderOn(false);
      });
    };
    refresh();
    const screenReaderSub = AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      setIsScreenReaderOn,
    );
    const a11yServiceSub =
          (IS_ANDROID )? (
            AccessibilityInfo.addEventListener as (
              event: string,
              handler: () => void,
            ) => {remove: () => void}
          )('accessibilityServiceChanged', refresh)
        : null;
    return () => {
      screenReaderSub.remove();
      a11yServiceSub?.remove();
    };
  }, []);

  return isScreenReaderOn;
};

export default {
  accessibleInput,
  accessibleButton,
  accessibleToggleButton,
  accessibleLink,
  accessibleSearch,
  accessibleImage,
  accessibleKeyboardKey,
  accessibleText,
  accessibleAdjustable,
  accessibleImageButton,
  accessibleHeader,
  accessibleSummary,
  accessibleAlert,
  accessibleCheckbox,
  accessibleCombobox,
  accessibleMenu,
  accessibleMenubar,
  accessibleMenuItem,
  accessibleProgressbar,
  accessibleRadio,
  accessibleRadioGroup,
  accessibleScrollbar,
  accessibleSpinButton,
  accessibleSwitch,
  accessibleTab,
  accessibleTabbar,
  accessibleTablist,
  accessibleTimer,
  accessibleList,
  accessibleToolbar,
  useIsScreenReaderOn,
};
