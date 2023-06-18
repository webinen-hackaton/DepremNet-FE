import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
  FlatList,
  ScrollView,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Avatar } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import StandartButton from "../../../components/button";

export default EditTeam = () => {
  const [teamName, setTeamName] = useState("");
  const [teamType, setTeamType] = useState("Sağlık Ekibi");
  const [teamStatus, setTeamStatus] = useState("Yolda");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [isMemberModalVisible, setIsMemberModalVisible] = useState(false);
  const [statusPickerVisible, setStatusPickerVisible] = useState(false);
  const [typePickerVisible, setTypePickerVisible] = useState(false);
  const teamTypeOptions = [
    "Arama Kurtarma Ekibi",
    "Sağlık Ekibi",
    "Temel Gıda Sağlayıcılar",
    "Kıyafet Sağlayıcılar",
    "Çadır Ekibi",
    "Koy",
  ];
  const teamStatusOptions = [
    "Yolda",
    "Görevde",
    "İstirahatte",
    "Dağıldı",
    "Yemek Molası",
  ];
  const pickerRef = useRef();
  const typePickerRef = useRef();

  // Example mock members data
  const [mockMembers, setMockMembers] = useState([]);

  const fetchMockMembers = async () => {
    try {
      const response = await fetch("https://randomuser.me/api/?results=20");
      const data = await response.json();
      const results = data.results;

      const members = results.map((result, index) => ({
        id: index + 1,
        avatar: result.picture.large,
        name: `${result.name.first} ${result.name.last}`,
        role: result.location.city,
      }));

      setMockMembers(members);
    } catch (error) {
      console.error("Error fetching mock members:", error);
    }
  };

  useEffect(() => {
    fetchMockMembers();
  }, []);

  const handleAddMember = () => {
    setIsMemberModalVisible(true);
  };

  const handleSelectMember = (member) => {
    const index = selectedMembers.findIndex(
      (selectedMember) => selectedMember.id === member.id
    );

    if (index === -1) {
      if (selectedMembers.length < 5) {
        setSelectedMembers([...selectedMembers, member]);
      }
    } else {
      const updatedMembers = [...selectedMembers];
      updatedMembers.splice(index, 1);
      setSelectedMembers(updatedMembers);
    }
  };

  const renderMemberItem = ({ item }) => {
    const isSelected = selectedMembers.some(
      (selectedMember) => selectedMember.id === item.id
    );

    return (
      <TouchableOpacity
        style={[styles.memberItem, isSelected && styles.selectedMemberItem]}
        onPress={() => handleSelectMember(item)}
      >
        <Avatar
          rounded
          source={{ uri: item.avatar }}
          containerStyle={styles.memberAvatar}
        />
        <Text style={styles.memberName}>{item.name}</Text>
        <Text style={styles.memberRole}>{item.role}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Düzenle</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Takım Adı:</Text>
            <TextInput
              style={styles.input}
              value={teamName}
              onChangeText={setTeamName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Takım Türü:</Text>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 8,
                padding: 8,
              }}
              onPress={() => setTypePickerVisible(true)}
            >
              <Text>{teamType ? teamType : "Seçiniz"}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Takım Durumu:</Text>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 8,
                padding: 8,
              }}
              onPress={() => setStatusPickerVisible(true)}
            >
              <Text>{teamStatus ? teamStatus : "Seçiniz"}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.memberContainer}>
            <Text style={styles.memberText}>
              Üye ({selectedMembers.length}/5):
            </Text>
            <TouchableOpacity
              style={styles.addMemberButton}
              onPress={handleAddMember}
            >
              <Ionicons name="add" size={18} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.selectedMembersContainer}>
            {selectedMembers.map((member, index) => (
              <View key={index} style={styles.memberItem}>
                <Avatar
                  rounded
                  source={{ uri: member.avatar }}
                  containerStyle={styles.memberAvatar}
                />
                <Text style={styles.memberName}>{member.name}</Text>
                <Text style={styles.memberRole}>{member.role}</Text>
              </View>
            ))}
          </View>

          <View style={styles.buttonContainer}>
            <StandartButton text="Kaydet" onPress={() => {}} />
          </View>

          <Modal visible={isMemberModalVisible} animationType="slide">
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Üyeler</Text>
              <FlatList
                data={mockMembers}
                renderItem={renderMemberItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                contentContainerStyle={styles.memberList}
              />
              <TouchableOpacity
                style={styles.closeModalButton}
                onPress={() => setIsMemberModalVisible(false)}
              >
                <Text style={styles.closeModalButtonText}>Kapat</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </ScrollView>
      {statusPickerVisible && (
        <Picker
          ref={pickerRef}
          style={styles.input}
          selectedValue={teamStatus}
          onValueChange={(value) => {
            setTeamStatus(value);

            pickerRef.current.blur();
            setStatusPickerVisible(false);
          }}
        >
          <Picker.Item label="Seçiniz" value="" />
          {teamStatusOptions.map((option) => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>
      )}
      {typePickerVisible && (
        <Picker
          ref={typePickerRef}
          style={styles.input}
          selectedValue={teamType}
          onValueChange={(value) => {
            setTeamType(value);
            typePickerRef.current.blur();
            setTypePickerVisible(false);
          }}
        >
          <Picker.Item label="Seçiniz" value="" />
          {teamTypeOptions.map((option) => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 48,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    padding: 8,
  },
  memberContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  memberText: {
    fontSize: 16,
    marginRight: 8,
  },
  addMemberButton: {
    backgroundColor: "#e8e8e8",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedMembersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  memberItem: {
    flexDirection: "column",
    alignItems: "center",
    width: "50%",
    marginBottom: 16,
  },
  selectedMemberItem: {
    backgroundColor: "#e8e8e8",
  },
  memberAvatar: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  memberName: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  memberRole: {
    fontSize: 12,
    color: "gray",
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 16,
  },
  modalContainer: {
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  memberList: {
    flexGrow: 1,
    justifyContent: "center",
  },
  closeModalButton: {
    backgroundColor: "#e8e8e8",
    padding: 12,
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 16,
  },
  closeModalButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
