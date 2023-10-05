export const TOTAL_LOCAL_STORAGE_LIMIT = 1024 * 1024 * 250; // 250MB

export default class LocalStorageObjectManager {
  localStorageKey: string;
  maxSize: number = 0;
  // maxAge: number;

  constructor(localStorageKey: string, maxSize?: number, maxAge?: number) {
    if (!localStorageKey) throw new Error("No localStorageKey provided");
    this.localStorageKey = localStorageKey;
    try {
      this._ensureLocalStorageIsCallable();
      if (!localStorage.getItem(this.localStorageKey)) {
        this.setObject({});
        this.maxSize = maxSize || 1024 * 1024 * 5; // 5MB
        // this.maxAge = maxAge || 1000 * 60 * 60 * 24 * 7; // 7 days
      } else {
        return this;
      }
    } catch (error) {
      // to avoid polluting the console
      // console.error(error);
    }
  }

  _ensureLocalStorageIsCallable() {
    try {
      if (!window?.localStorage) {
        throw new Error(
          "Local storage is not available, looks like you're running this function from node or in incognito view"
        );
      }
    } catch {
      // console.log("Local storage is not available, looks like you're running this function from node or in incognito view")
    }
  }

  _ensureLocalStorageIsNotFull() {
    try {
      if (!localStorage) return;
      const currentSize = localStorage.getItem(this.localStorageKey)?.length;
      // if (!!currentSize && currentSize > this.maxSize) {
      //   console.log(
      //     `cleaning up ${this.localStorageKey} because it's over the max size of ${this.maxSize}`
      //   );
      //   localStorage.setItem(this.localStorageKey, JSON.stringify({}));
      // }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Get object from Local Storage by key
   * @returns Object | null
   */

  getObject(): Object | null {
    try {
      this._ensureLocalStorageIsCallable();
      this._ensureLocalStorageIsNotFull();
      const value = localStorage.getItem(this.localStorageKey);
      if (!value)
        throw new Error(`No value found for key: ${this.localStorageKey}`);

      return JSON.parse(value);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // Creates a new key/value pair inside local storage
  setObject(value: Object) {
    let key = this.localStorageKey;
    try {
      const stringValue = JSON.stringify(value);
      localStorage.setItem(key, stringValue);
    } catch (error) {
      console.error(`Error stringifying value for key: ${key}`);
      return null;
    }
  }

  // Create new value within an existing localStorage object
  //! warning: this will overwrite the entire object
  setValueOfObject(key: string, newValue: Object) {
    try {
      const storedObject = this.getObject();
      if (!storedObject) return null;
      // @ts-ignore
      storedObject[key] = newValue;
      this.setObject(storedObject);
      return storedObject;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // Update existing localstorage Object with new values
  updateValueOfObject(key: string, newValue: Object) {
    try {
      const storedObject = this.getObject();
      if (!storedObject) return null;
      // @ts-ignore
      storedObject[key] = { ...storedObject[key], ...newValue };
      this.setObject(storedObject);
      return storedObject;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // get value from an existing localstorage object
  getValueFromObject(objectKey: string) {
    try {
      const storedObject = this.getObject();
      if (!storedObject) return null;
      // @ts-ignore
      return storedObject[objectKey];
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export const getOrSaveToLocalStorage = (
  key: string,
  value: string,
  manager: LocalStorageObjectManager
) => {
  const foundValue = manager.getValueFromObject(key);
  if (foundValue) return foundValue;
  manager.setValueOfObject(key, value);
};

export const AccessLocalStorage = (key: string) => {
  if (typeof window === "undefined") return null;
  return new LocalStorageObjectManager(key);
};
