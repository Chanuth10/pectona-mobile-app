import {
  Text,
  Modal,
  View,
  Pressable,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { firebase } from "../../../../Firebase/firebaseConfig";
import { useState } from "react";
import Lottie from "lottie-react-native";

const EditCardModal = ({ item, isOpen, onClose, getData, setIsLoading }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expiryMonth, setExpiryMonth] = useState(12);
  const [expiryYear, setExpiryYear] = useState(1999);
  const [cvn, setCVN] = useState(123);
  const [isEditing, setIsEditing] = useState(false);
  const editWallet = async () => {
    setIsLoading(true);
    const db = firebase.firestore().collection("CardWallet").doc(item.id);
    const cardToSave = {
      id: new Date(),
      cardType: "Debit",
      cardNumber: cardNumber,
      cardHolderName: cardHolderName,
      expiryMonth: expiryMonth,
      expiryYear: expiryYear,
      cvn: cvn,
    };
    onClose();
    await db.update(cardToSave).then(() => {
      getData();
      setIsLoading(false);
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isOpen}
      onRequestClose={onClose}
      style={styles.modalContainer}
    >
      {isEditing ? (
        <View style={styles.mainContainer}>
          <View>
            <View style={styles.topContainer}>
              <Pressable onPress={onClose}>
                <AntDesign name="left" size={25} color="black" />
              </Pressable>
              <Text style={styles.header}>Edit Card Details</Text>
            </View>
            <View style={styles.topicContainer}>
              <Text style={styles.topic}>Payment Details</Text>
            </View>
            <View style={styles.contentContainer}>
              <View>
                <Text style={styles.fieldHeader}>Card Number</Text>
                <TextInput
                  placeholder={item.cardNumber}
                  style={styles.cardNumberInput}
                  keyboardType={"numeric"}
                  maxLength={8}
                  onChangeText={(value) => setCardNumber(value)}
                />
              </View>
              <View>
                <Text style={styles.fieldHeader}>Card Holder</Text>
                <TextInput
                  placeholder="Name"
                  style={styles.cardNumberInput}
                  onChangeText={(value) => setCardHolderName(value)}
                />
              </View>
              <View style={styles.expiryContainer}>
                <View>
                  <Text style={styles.fieldHeader}>Expiry Month</Text>
                  <TextInput
                    placeholder="Expiry Month"
                    style={styles.expiryDate}
                    keyboardType={"numeric"}
                    maxLength={2}
                    onChangeText={(value) => setExpiryMonth(value)}
                  />
                </View>
                <View>
                  <Text style={styles.fieldHeader}>Expiry Year</Text>
                  <TextInput
                    placeholder="Expiry Year"
                    style={styles.expiryDate}
                    keyboardType={"numeric"}
                    maxLength={4}
                    onChangeText={(value) => setExpiryYear(value)}
                  />
                </View>
              </View>
              <View>
                <Text style={styles.fieldHeader}>CVN</Text>
                <Text style={styles.fieldDescription}>
                  This code is a three or four digit number printed on the back
                  or front of credit cards.
                </Text>
                <TextInput
                  placeholder="CVN"
                  style={styles.cvn}
                  keyboardType={"numeric"}
                  maxLength={4}
                  onChangeText={(value) => setCVN(value)}
                />
              </View>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={() => setIsEditing(false)}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
            <Pressable onPress={editWallet} style={styles.submitButton}>
              <Text style={styles.submitText}>Submit</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View style={styles.mainContainer}>
          <View>
            <View style={styles.topContainer}>
              <Pressable onPress={onClose}>
                <AntDesign name="left" size={25} color="black" />
              </Pressable>
              <Text style={styles.header}>Card Details</Text>
            </View>
            <View style={styles.topicContainer}>
              <Text style={styles.topic}>Payment Details</Text>
            </View>
            <Lottie
              source={require("../../../../assets/animation/crediCardView.json")}
              autoPlay
              loop
              style={styles.lottie}
            />
            <View style={styles.contentDetailsContainer}>
              <View style={styles.textContainer}>
                <View>
                  <Text style={styles.fieldHeader}>Card Number</Text>
                  <Text>{item.cardNumber}</Text>
                </View>
                <View>
                  <Text style={styles.fieldHeader}>Card Holder</Text>
                  <Text>{item.cardHolderName}</Text>
                </View>
                <View>
                  <Text style={styles.fieldHeader}>Card Type</Text>
                  <Text>{item.cardType}</Text>
                </View>
                <View style={styles.expiryContainer}>
                  <View>
                    <Text style={styles.fieldHeader}>Expiry Month</Text>
                    <Text>{item.expiryMonth}</Text>
                  </View>
                  <View>
                    <Text style={styles.fieldHeader}>Expiry Year</Text>
                    <Text>{item.expiryYear}</Text>
                  </View>
                </View>
                <View>
                  <Text style={styles.fieldHeader}>CVN</Text>
                  <Text>{item.cvn}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={() => setIsEditing(true)}
              style={styles.submitButton}
            >
              <Text style={styles.submitText}>Edit</Text>
            </Pressable>
          </View>
        </View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    height: Dimensions.get("window").height,
  },
  topContainer: {
    flexDirection: "row",
    width: "70%",
    padding: 10,
    textAlign: "center",
    justifyContent: "space-between",
  },
  header: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  topicContainer: {
    width: "100%",
    padding: 10,
    borderBottomColor: "purple",
    borderTopColor: "purple",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    marginTop: 10,
  },
  lottie: {
    marginTop: -70,
    marginHorizontal: 10,
  },
  textContainer: {
    marginTop: 240,
  },
  topic: {
    fontSize: 18,
    color: "purple",
  },
  cardNumberInput: {
    width: Dimensions.get("screen").width - 30,
    height: 57,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  expiryDate: {
    width: 150,
    borderColor: "gray",
    height: 57,
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  cvn: {
    width: 100,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  expiryContainer: {
    flexDirection: "row",
    gap: 20,
  },
  buttonContainer: {
    width: Dimensions.get("window").width,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    position: "absolute",
    bottom: 40,
  },
  mainContainer: {
    height: Dimensions.get("window").height,
  },

  contentContainer: {
    paddingHorizontal: 10,
  },
  contentDetailsContainer: {
    paddingHorizontal: 10,
    alignItems: "center",
  },
  cancelButton: {
    borderColor: "red",
    borderWidth: 2,
    width: 100,
    padding: 20,
    borderRadius: 16,
  },
  submitButton: {
    borderColor: "purple",
    width: 100,
    borderWidth: 2,
    padding: 20,
    borderRadius: 16,
  },
  cancelText: {
    textAlign: "center",
    color: "red",
    fontWeight: "bold",
  },
  submitText: {
    textAlign: "center",
    color: "purple",
    fontWeight: "bold",
  },
  fieldHeader: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
  },
  fieldDescription: {
    color: "gray",
    fontStyle: "italic",
    marginVertical: 5,
    marginLeft: 5,
  },
});

export default EditCardModal;
