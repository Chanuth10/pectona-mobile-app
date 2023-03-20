import { StyleSheet, StatusBar } from "react-native";

import React, { useEffect, useState } from "react";
import HomeHeadNav from "../../components/HomeHeadNav";
import BottomNav from "../../components/BottomNav";
import { firebase } from "../../../Firebase/firebaseConfig";
import { petProfileStyles } from "./PetProfileStyles.js";
import { View, Text, ScrollView, TextInput, Button } from "react-native";
import DropDown from "../../components/DropDown/DropDown";

const Pets = ({ navigation }) => {

  const [species, setSpecies] = useState([
    { label: 'Dog', value: 'Dog' },
    { label: 'Cat', value: 'Cat' },
  ]);

  const [gender, setGender] = useState([
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
  ]);

  const [userloggeduid, setUserloggeduid] = useState(null);
  const [userdata, setUserdata] = useState(null);

  useEffect(() => {
    const checklogin = () => {
      firebase.auth().onAuthStateChanged((user) => {
        // console.log(user);
        if (user) {
          // navigation.navigate('home');
          setUserloggeduid(user.uid);
        } else {
          console.log("no user");
        }
      });
    };
    checklogin();
  }, []);

  const getuserdata = async () => {
    const docRef = firebase
      .firestore()
      .collection("UserData")
      .where("uid", "==", userloggeduid);
    const doc = await docRef.get();
    if (!doc.empty) {
      doc.forEach((doc) => {
        setUserdata(doc.data());
      });
    } else {
      console.log("no user data");
    }
  };

  console.log(userdata);

  useEffect(() => {
    getuserdata();
  }, [userloggeduid]);
  return (
    <View style={petProfileStyles.container}>
      <StatusBar />
      <HomeHeadNav navigation={navigation} />
      <View style={petProfileStyles.bottomnav}>
        <BottomNav navigation={navigation} />
      </View>

      <ScrollView style={petProfileStyles.containerin}>
        {/* <Text style={petProfileStyles.head1}>
          {userdata ? (
            <Text>{userdata.name}</Text>
          ) : (
            "loading"
          )}
        </Text> */}

        <Text style={petProfileStyles.head1}>
          Create Pet Profile
        </Text>

        <TextInput variant="outlined" placeholder="Enter Pet Name" style={petProfileStyles.inputContainer}></TextInput>
        <Text variant='subtitle 2' style={petProfileStyles.textLableContainer}>Please Enter Pet name</Text>

        <DropDown data={species} disable={true} />
        <Text variant='subtitle 2' style={petProfileStyles.textLableContainer}>Please Select Pet Species</Text>

        <TextInput variant="outlined" placeholder="Enter Pet Breed" style={petProfileStyles.inputContainer}></TextInput>
        <Text variant='subtitle 2' style={petProfileStyles.textLableContainer}>Please Enter Pet Breed</Text>

        <DropDown data={gender} disable={true} />
        <Text variant='subtitle 2' style={petProfileStyles.textLableContainer}>Please Select Pet Gender</Text>

        <TextInput variant="outlined" placeholder="Enter Pet Color" style={petProfileStyles.inputContainer}></TextInput>
        <Text variant='subtitle 2' style={petProfileStyles.textLableContainer}>Please Enter Pet Color</Text>

        <TextInput variant="outlined" placeholder="Enter Pet Date Of Birth" style={petProfileStyles.inputContainer}></TextInput>
        <Text variant='subtitle 2' style={petProfileStyles.textLableContainerLast}>Please Enter Pet Date of Birth</Text>

        <View style={petProfileStyles.cancelbuttonContainer}>
          <Button
            title="Cancel"
            color="#B6B3B3"
          // onPress={() => navigation.navigate('PetList')}
          >
          </Button>
        </View>

        <View style={petProfileStyles.editbuttonContainer}>
          <Button
            title="Submit"
          // onPress={handleSubmit}
          >
          </Button>
        </View>

      </ScrollView>
    </View>
  );
};

export default Pets;