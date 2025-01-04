import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
  try {
    const stringValue =
      typeof value === 'object' ? JSON.stringify(value) : value;
    await AsyncStorage.setItem(key, stringValue);
    // await AsyncStorage.setItem(  key,typeof value === 'object' ? JSON.stringify(value) : value, );
    console.log(`Stored data successfully: ${key}`);
    console.log(`Storing userData Successfully: ${value}`);
  } catch (error) {
    console.error(`Error storing ${key}:`, error);
  }
};

export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value) {
      // Try parsing as JSON; if it fails, return the raw string
      try {
        return JSON.parse(value);
      } catch {
        return value; // Return as a plain string
      }
    }
    return null; // Return null if no value found
  } catch (error) {
    console.error(`Error retrieving data for key "${key}":`, error);
    return null;
  }
};

// export const getData = async key => {
//   let value = null;
//   try {
//     value = await AsyncStorage.getItem(key);
//   } catch (e) {
//     console.log(e);
//   }
//   return value;
// };

// export const getData = async key => {
//   try {
//     const value = await AsyncStorage.getItem(key);
//     return value ? JSON.parse(value) : null; // Parse the JSON string if it exists
//   } catch (e) {
//     console.error(`Error retrieving data for key "${key}":`, e);
//     return null;
//   }
// };

// export const getData = async key => {
//   try {
//     const value = await AsyncStorage.getItem(key);
//     if (value) {
//       // Try parsing the value if it looks like a JSON string
//       try {
//         // Check if the value starts with '{' or '[' to detect JSON-like data
//         return value.startsWith('{') || value.startsWith('[') ? JSON.parse(value) : value;
//       } catch (e) {
//         // If JSON.parse fails, return the raw string
//         return value;
//       }
//     }
//     return null; // Return null if no value is found
//   } catch (e) {
//     console.error(`Error retrieving data for key "${key}":`, e);
//     return null;
//   }
// };


export const clearData = async () => {
  try {
    await AsyncStorage.clear();
    console.log('Cleared all AsyncStorage data successfully');
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error);
  }
};

// export {storeData, getData, clearData};
