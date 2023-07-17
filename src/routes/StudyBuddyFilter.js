import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';



import { useNavigation, useRoute } from '@react-navigation/native';

import DropDownPicker from 'react-native-dropdown-picker';

export default function StudyBuddyFilter() {

  const navigation = useNavigation();


  const route = useRoute();

  const {
    filterModule: initialFilterModule,
    filterPlace: initialFilterPlace,
  } = route.params;

  //reference to chatGPT and StackOverflow: https://stackoverflow.com/questions/44223727/react-navigation-goback-and-update-parent-state
  const goBack = () => {
    navigation.goBack();
    route.params.updateVariables({
      updatedVariable1: filterModule,
      updatedVariable2: filterPlace,
    });
  }

  const [filterModule, setFilterModule] = useState(initialFilterModule);
  const [filterPlace, setFilterPlace] = useState(initialFilterPlace);
  const [moduleData, setModuleData] = useState([]);

  const getData = () => {
    fetch('https://api.nusmods.com/v2/2022-2023/moduleList.json')
      .then((response) => response.json())
      .then((json) => {
        const data = json.map((module) => ({ label: module.moduleCode + " " + module.title, value: module.moduleCode }));
        setModuleData(data);
      })
  }

  const [placeData, setPlaceData] = useState([
    { label: 'Central Library', value: 'Central Library' },
    { label: 'Business Library', value: 'Business Library' },
    { label: 'Medical Library', value: 'Medical Library' },
    { label: 'Science Library', value: 'Science Library' },
    { label: 'Law Library', value: 'Law Library' },
    { label: 'Music Library', value: 'Music Library' },
    { label: 'Chinese Library', value: 'Chinese Library' },
    { label: 'Hon Sui Sen Memorial Library', value: 'Hon Sui Sen Memorial Library' },
    { label: 'Eusoff Hall', value: 'Eusoff Hall' },
    { label: 'Kent Ridge Hall', value: 'Kent Ridge Hall' },
    { label: 'King Edward VII Hall', value: 'King Edward VII Hall' },
    { label: 'Raffles Hall', value: 'Raffles Hall' },
    { label: 'Sheares Hall', value: 'Sheares Hall' },
    { label: 'Temasek Hall', value: 'Temasek Hall' },
    { label: 'Helix House', value: 'Helix House' },
    { label: 'LightHouse', value: 'LightHouse' },
    { label: 'Pioneer House', value: 'Pioneer House' },
    { label: 'RVRC', value: 'RVRC' },
    { label: 'UTown', value: 'UTown' },
    { label: 'PGPR', value: 'PGPR' },
    { label: 'College of Design and Engineering', value: 'College of Design and Engineering' },
    { label: 'Duke-NUS Medical School', value: 'Duke-NUS Medical School' },
    { label: 'Faculty of Arts and Social Science', value: 'Faculty of Arts and Social Science' },
    { label: 'Faculty of Dentistry', value: 'Faculty of Dentistry' },
    { label: 'Faculty of Law', value: 'Faculty of Law' },
    { label: 'Faculty of Science', value: 'Faculty of Science' },
    { label: 'School of Science', value: 'School of Science' },
    { label: 'School of Computing', value: 'School of Computing' },
    { label: 'Yong Loo Lin School of Medicine', value: 'Yong Loo Lin School of Medicine' },
    { label: 'Yong View Taw Conservatory of Music', value: 'Yong View Taw Conservatory of Music' },
  ])

  useEffect(() => {
    getData();
  }, [])

  const [openModule, setOpenModule] = useState(false);
  const [openPlace, setOpenPlace] = useState(false);


  const handleApplyFilter = () => {
    if ( filterModule == initialFilterModule && filterPlace == initialFilterPlace) {
      console.log("cool");
      navigation.goBack();
    }
    else {
      goBack();
    }
  }

  return (
    <View style = {{flex: 1}}> 
    <View style={{ flex: 1, paddingTop: 10, backgroundColor: 'white', paddingHorizontal: 10}}>
      <TouchableOpacity style = {{alignItems: 'flex-end'}}
      onPress={() => {setFilterModule("");setFilterPlace("");}}>
        <Text>Reset</Text>
      </TouchableOpacity>
          <Text style={{ fontSize: 16, color: 'gray', alignItems: 'flex-start', paddingTop: 10, paddingBottom: 3 }}>Course</Text>
        <DropDownPicker
          zIndex={2000}
          zIndexInverse={1000}
            open={openModule}
            setOpen={setOpenModule}
            value={filterModule}
            items={moduleData}
            setValue={setFilterModule}
          />
          <Text style={{ fontSize: 16, color: 'gray', alignItems: 'flex-start', paddingTop: 10, paddingBottom: 3 }}>Place</Text>
        <DropDownPicker
          zIndex={1000}
          zIndexInverse={2000}
            open={openPlace}
            setOpen={setOpenPlace}
            value={filterPlace}
            items={placeData}
            setValue={setFilterPlace}
          />
          </View>
          <View style = {{alignItems: 'center'}}>
      <View style={{ alignItems: 'center', position: 'absolute', bottom: 15}}>
        <TouchableOpacity
          activeOpacity={0.75}
          style={styles.saveButton}
          onPress={() => handleApplyFilter()}
        >
          <Text style={styles.saveText}>Apply Filters</Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dropdown: {
    width: Dimensions.get('window').width - 20,
    height: 40,
    marginBottom: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  saveButton: {
    height: 40,
    width: Dimensions.get('window').width - 100,
    backgroundColor: '#2de0ff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  saveText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});