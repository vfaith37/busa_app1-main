// import React from 'react';
// import { View, Text, } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { useFormikContext } from 'formik';

// const Dropdown = ({ label, items, name }) => {
//   const { setFieldValue } = useFormikContext();

//   return (
//     <View>
//       <Text>{label}</Text>
//       <Picker
//         selectedValue={items.value}
//         style={{ height: 50, width: 100 }}
//         onValueChange={(itemValue) =>
//           setFieldValue(name, itemValue)
//         }
//       >
//         {items.map((item) => (
//           <Picker.Item key={item.value} label={item.label} value={item.value} />
//         ))}
//       </Picker>
//     </View>
//   );
// };

// export default Dropdown;