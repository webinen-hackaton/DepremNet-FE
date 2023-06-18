import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Modal, FlatList, ScrollView, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Avatar } from "react-native-elements";
import ModalDropdown from "react-native-modal-dropdown";
import StandartButton from "../../../components/button";
import {TeamContext} from "../../../contexts/teamContext"
import { useNavigation } from "@react-navigation/native";

export default AddTeam = () => {
  const { navigate } = useNavigation();
  const [teamName, setTeamName] = useState("");
  const [teamType, setTeamType] = useState("");
  const [teamStatus, setTeamStatus] = useState("Beklemede");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [isMemberModalVisible, setIsMemberModalVisible] = useState(false);

  const teamTypeOptions = ["Arama Kurtarma Ekibi", "Sağlık Ekibi", "Temel Gıda Sağlayıcılar", "Kıyafet Sağlayıcılar", "Çadır Ekibi", "Çadır Ekibi"];
  // const teamStatusOptions = ["Yolda", "Görevde", "İstirahatte", "Dağıldı", "Yemek Molası"];

  // Example mock members data
  const [mockMembers, setMockMembers] = useState([]);
  const { people , team, setTeam, setTeams, teams} = React.useContext(TeamContext)
  const [updatedTeams, setUpdatedTeams] = useState([...teams]);


  // useEffect(() => {
    // setSelectedMembers(team?.people);
    // setTeamName(team?.name);
    // setTeamType(team?.type);
    // setTeamStatus(team?.status);
  // }, []);

  const handleAddMember = () => {
    setIsMemberModalVisible(true);
  };

  const handleSelectMember = (member) => {
    const index = selectedMembers.findIndex((selectedMember) => selectedMember.id === member.id);

    if (index === -1) {
      if (selectedMembers?.length < 5) {
        setSelectedMembers([...selectedMembers, member]);
      }
    } else {
      const updatedMembers = [...selectedMembers];
      updatedMembers.splice(index, 1);
      setSelectedMembers(updatedMembers);
    }
  };

  const renderMemberItem = ({ item }) => {
    const isSelected = selectedMembers?.some((selectedMember) => selectedMember.id === item.id);

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

  const saveTeam = () => {
    const updatedTeam = {
      name: teamName,
      type: teamType,
      status: teamStatus,
      people: selectedMembers,
    };
  ;
    updatedTeams.unshift(updatedTeam);

    setTeams(updatedTeams);
    setTeam(updatedTeam);
    navigate("MyTeams");

  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Takım Ekle</Text>
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
          <ModalDropdown
            style={styles.input}
            defaultValue="Seçiniz"
            options={teamTypeOptions}
            onSelect={(index, value) => setTeamType(value)}
          />
        </View>


        <View style={styles.memberContainer}>
          <Text style={styles.memberText}>Üye ({selectedMembers?.length ? selectedMembers.length:0}/5):</Text>
          <TouchableOpacity style={styles.addMemberButton} onPress={handleAddMember}>
            <Ionicons name="add" size={18} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.selectedMembersContainer}>
          {selectedMembers?.map((member, index) => (
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
        <StandartButton text="Kaydet" onClick={() => {saveTeam()}}  />
        </View>

        <Modal visible={isMemberModalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Üyeler</Text>
            <FlatList
              data={people}
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
  );
}

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
    paddingBottom: 16,
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
    marginRight: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    padding: 8,
  },
  selectedMemberItem: {
    backgroundColor: "lightgreen",
  },
  memberAvatar: {
    width: 100, // İstediğiniz boyutu belirleyebilirsiniz
    height: 100, // İstediğiniz boyutu belirleyebilirsiniz
    borderRadius: 50, // Yarım daire şeklinde olması için yarı çapa ayarlandı
  },
  memberName: {
    marginTop: 8,
    fontWeight: "bold",
    textAlign: "center", // Yeni eklenen stil
    maxWidth: 100, // İstediğiniz maksimum genişliği belirleyebilirsiniz
  },
  memberRole: {
    marginTop: 4,
    color: "gray",
    maxWidth: 100,
  },
  modalContainer: {
    flex: 1,
    padding: 16,
    marginTop: 48,
    backgroundColor: "#f8f8f8",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  memberList: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center", // Yeni eklenen stil
  },
  closeModalButton: {
    backgroundColor: "#e8e8e8",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  closeModalButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    marginTop: 16,
    width: "100%",
    alignItems: "center",
    },
});