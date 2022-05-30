// import { StyleSheet, Text, View, FlatList } from "react-native";
// import React from "react";
// import Food from "./Food";
// import Spinner from "./Spinner";
// // import useUserFoods from "../hooks/useUserFoods";
// import useUserCartFoods from "../hooks/useUserCartFoods";
// import UserContext from "../contexts/UserContext";

// const UserCartFoodList = () => {
//   const state = UserContext(UserContext);
//   return (
//     <View style={{ ...style }}>
//       {/* {cartFoods.map((e, index) => {
//             <Text
//               style={{
//                 marginLeft: 15,
//                 fontWeight: "bold",
//                 fontSize: 15,
//                 marginBottom: 5,
//               }}
//             >
//               Таны хадгалсан хоолны тоо: {e._id}
//             </Text>;
//             {
//               /* <Food data={foods} /> */}
//       {/* <Text style={{ marginLeft: 15 }}>{e.description}</Text>; })} */}
//       {/* {errorMessage && (
//             <Text style={{ color: "red", marginLeft: 15 }}>{errorMessage}</Text>
//           )} */}
//       {/* {loading && <Spinner showText={false} />} */}
//       {state.cart.map((el) => {
//         <Text>{el.name}</Text>;
//         // <FlatList
//         //   showsHorizontalScrollIndicator={false}
//         //   data={el}
//         //   keyExtractor={(el) => el.name}
//         //   renderItem={({ el, index }) => <Food key={index} data={el} />}
//         // />;
//       })}
//     </View>
//   );
// };

// export default UserCartFoodList;

// const css = StyleSheet.create({});

// import { StyleSheet, Text, View, FlatList } from "react-native";
// import React from "react";
// import Food from "./Food";
// import Spinner from "./Spinner";
// // import useUserFoods from "../hooks/useUserFoods";
// import useUserCartFoods from "../hooks/useUserCartFoods";

// const UserCartFoodList = ({
//   data,
//   style,
//   searchLocalValue,
//   searchServerValue,
//   refreshCategory,
//   setRefresh,
// }) => {
//   const [cartFoods, errorMessage, searchFood, loading] = useUserCartFoods(
//     searchServerValue,
//     refreshCategory,
//     setRefresh
//   );

//   // const filteredFoods = foods.filter((el) =>
//   //   el.name.toLowerCase().includes(searchLocalValue.toLowerCase())
//   // );

//   //   console.log(data);
//   return (
//     <View style={{ ...style }}>
//       {/* {cartFoods.map((e, index) => {
//         <Text
//           style={{
//             marginLeft: 15,
//             fontWeight: "bold",
//             fontSize: 15,
//             marginBottom: 5,
//           }}
//         >
//           Таны хадгалсан хоолны тоо: {e._id}
//         </Text>;
//         {
//           /* <Food data={foods} /> */}
//       {/* <Text style={{ marginLeft: 15 }}>{e.description}</Text>; })} */}
//       {/* {errorMessage && (
//         <Text style={{ color: "red", marginLeft: 15 }}>{errorMessage}</Text>
//       )} */}
//       {/* {loading && <Spinner showText={false} />} */}
//       {/* {cartFoods.map((el) => {
//         <FlatList
//           showsHorizontalScrollIndicator={false}
//           data={el}
//           keyExtractor={(el) => el.name}
//           renderItem={({ el, index }) => <Food key={index} data={el} />}
//         />;
//       })} */}
//     </View>
//   );
// };

// export default UserCartFoodList;

// const css = StyleSheet.create({});
