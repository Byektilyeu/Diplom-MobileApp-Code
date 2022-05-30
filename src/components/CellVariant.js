// import { Cell, Section, TableView } from "react-native-tableview-simple";
// import { View, Text } from "react-native";
// import { Button } from "react-native-paper";
// import React, { useState, useContext, useEffect } from "react";

// const CellVariant = (props) => {
//   const [categoryId, setCategoryId] = useState(null);
//   const [categoryName, setCategoryName] = useState(null);
//   const [categoryDescription, setCategoryDescription] = useState(null);

//   const getCategory = async (id) => {
//     setData(id);
//     console.log("data2:", data);
//     const result = await axios.get(`categories/${id}`);
//     setCategoryId(result.data.data.id);
//     setCategoryName(result.data.data.name);
//     setCategoryDescription(result.data.data.description);
//     // setShow(true);
//   };
//   return (
//     <Cell
//       {...props}
//       cellContentView={
//         <View
//           style={{
//             alignItems: "center",
//             flexDirection: "row",
//             flex: 1,
//             paddingVertical: 10,
//           }}
//         >
//           <Text
//             allowFontScaling
//             numberOfLines={1}
//             style={{ flex: 1, fontSize: 15 }}
//           >
//             {props.title}
//           </Text>
//           <Button onPress={() => getCategory(props.id)}>Өөрчлөх</Button>
//           <Text
//             allowFontScaling
//             numberOfLines={1}
//             style={{ flex: 1, fontSize: 10 }}
//           >
//             {props.description}
//           </Text>

//           <Text>
//             {categoryId} -{categoryName}
//           </Text>
//         </View>
//       }
//     />
//   );
// };
// export default CellVariant;
