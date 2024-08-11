import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { Button, TouchableRipple } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Courses = ({ route, navigation }) => {
  const { staffId } = route.params; // Get staffId from route params
  console.log(staffId);
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    handleCourse();
  }, []);

  const handleCourse = async () => {
    try {
      const response = await axios.get('http://192.168.0.104:8000/api/course/list');
      if (response.data && response.data.data && response.data.data.data) {
        setCourses(response.data.data.data);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSelectCourse = (courseId) => {
    setSelectedCourses((prevSelectedCourses) =>
      prevSelectedCourses.includes(courseId)
        ? prevSelectedCourses.filter((id) => id !== courseId)
        : [...prevSelectedCourses, courseId]
    );
  };

  const validateSelection = () => {
    if (selectedCourses.length === 0) {
      Alert.alert('Validation Error', 'Please select at least one course.');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateSelection()) {
      return;
    }

    try {
      const token = await AsyncStorage.getItem('jwtToken');
      console.log({selectedCourses});
      const assignresult = await axios.post(
        `http://10.0.2.2:8000/api/admin/staff/${staffId}/assign-courses`,
        { course_ids: selectedCourses },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log({assignresult});
      Alert.alert('Success', 'Courses assigned to staff member successfully');
      navigation.goBack(); // Navigate back to the previous screen
    } catch (error) {
      Alert.alert('Error', 'Failed to assign courses');
      console.log(error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableRipple
      onPress={() => handleSelectCourse(item.id)}
      style={[
        styles.item,
        selectedCourses.includes(item.id) && styles.selectedItem,
      ]}
    >
      <View>
      <Text style={styles.style}>
          <Text style={{ fontWeight: '700', color: '#cdcddb' }}>Course Id: </Text>
          {item.id}
        </Text>
        <Text style={styles.style}>
          <Text style={{ fontWeight: '700', color: '#cdcddb' }}>Course Code: </Text>
          {item.code}
        </Text>
        <Text style={styles.style}>
          <Text style={{ fontWeight: '700', color: '#cdcddb' }}>Course Name: </Text>
          {item.name}
        </Text>
        <Text style={styles.style}>
          <Text style={{ fontWeight: '700', color: '#cdcddb' }}>Department: </Text>
          {item.department}
        </Text>
        <Text style={styles.style}>
          <Text style={{ fontWeight: '700', color: '#cdcddb' }}>Semester: </Text>
          {item.semester}
        </Text>
        <Text style={styles.style}>
          <Text style={{ fontWeight: '700', color: '#cdcddb' }}>Credit_hour: </Text>
          {item.credit_hour}
        </Text>
      </View>
    </TouchableRipple>
  );

  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.error}>Error: {error}</Text>
      ) : (
        <>
          <FlatList
            data={courses}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
          <Button mode="contained" onPress={handleSubmit} style={styles.button}>
            Assign Courses
          </Button>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  item: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#3b3b66',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  selectedItem: {
    backgroundColor: '#cdcddb',
  },
  style: {
    fontSize: 16,
    color: '#cdcddb',
    backgroundColor: '#3b3b66',
    fontWeight: '400',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#3b3b66',
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default Courses;



// import React, { useState, useEffect } from 'react';
// import { View, FlatList, TouchableOpacity, Button, Alert, StyleSheet } from 'react-native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Searchbar, Text } from 'react-native-paper';

// const Courses = ({ route, navigation }) => {
// //   const { staffId } = route.params;  // Assuming staffId is passed as a route parameter
//   const [courses, setCourses] = useState([]);
//   const [selectedCourses, setSelectedCourses] = useState([]);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredCourse, setFilteredCourse] = useState([]);

//   useEffect(() => {
//     handleCourse();
//   }, []);

//   useEffect(() => {
//     filterCourse();
//   }, [searchQuery, courses]);


//   const handleCourse = async () => {
//     try {
//       const response = await axios.get('http://10.0.2.2:8000/api/course/list');
//       if (response.data && response.data.data && response.data.data.data) {
//         console.log(response.data.data.data);
//         setCourses(response.data.data.data);
//         setFilteredCourse(response.data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching course:', error);
//       setError(error.message);
//     }
//   };

//   const handleSelectCourse = (courseId) => {
//     setSelectedCourses((prevSelectedCourses) =>
//       prevSelectedCourses.includes(courseId)
//         ? prevSelectedCourses.filter((id) => id !== courseId)
//         : [...prevSelectedCourses, courseId]
//     );
//   };

//   const handleSubmit = async () => {
//     try {
//       const token = await AsyncStorage.getItem('jwtToken');
//       await axios.post(
//         `http://10.0.2.2:8000/api/staff/${staffId}/assign-courses`,
//         { course_ids: selectedCourses },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       Alert.alert('Success', 'Courses assigned to staff member successfully');
//       navigation.goBack(); // Navigate back to the previous screen
//     } catch (error) {
//       console.error('Error assigning courses:', error);
//       Alert.alert('Error', 'Failed to assign courses');
//     }
//   };

//   const filterCourse = () => {
//     const lowercasedFilter = searchQuery.toLowerCase();
//     const filteredData = courses.filter(item => {
//       return Object.keys(item).some(key =>
//         String(item[key]).toLowerCase().includes(lowercasedFilter)
//     );
//   });
//     setFilteredCourse(filteredData);
//   };

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       onPress={() => handleSelectCourse(item.id)}
//       style={[
//         styles.item,
//         selectedCourses.includes(item.id) && styles.selectedItem,
//       ]}
//     >
//       <Text style={styles.style}><Text style={{fontWeight:'700', color:'#cdcddb'}}>Course Code: </Text>{item.code}</Text>
//       <Text style={styles.style}><Text style={{fontWeight:'700', color:'#cdcddb'}}>Course Name: </Text>{item.name}</Text>
//       <Text style={styles.style}><Text style={{fontWeight:'700', color:'#cdcddb'}}>Department: </Text>{item.department}</Text>
//       <Text style={styles.style}><Text style={{fontWeight:'700', color:'#cdcddb'}}>Semester: </Text>{item.semester}</Text>
//       <Text style={styles.style}><Text style={{fontWeight:'700', color:'#cdcddb'}}>Credit_hour: </Text>{item.credit_hour}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//          <Searchbar
//       placeholder="Search"
//       onChangeText={setSearchQuery}
//       value={searchQuery}
//       style={{backgroundColor:'#cdcddb'}}
//     />
//       {error ? (
//         <Text style={styles.error}>Error: {error}</Text>
//       ) : (
//         <>
//           <FlatList
//             data={courses}
//             renderItem={renderItem}
//             keyExtractor={(item) => item.id.toString()}
//           />
//           <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//             <Text style={styles.buttontext}>Assign Courses</Text>
//           </TouchableOpacity>
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: '#fff',
//   },
//   item: {
//     padding: 12,
//     marginVertical: 8,
//     backgroundColor: '#3b3b66',
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: 'black',
//   },
//   selectedItem: {
//     backgroundColor: '#cdcddb',
//   },
//   style: {
//     fontSize: 16,
//     color:'#cdcddb',
//     backgroundColor:'#3b3b66',
//     fontWeight:'400',
//   },
//   error: {
//     fontSize: 18,
//     color: 'red',
//     textAlign: 'center',
//   },
//   button:{
//     backgroundColor:'#cdcddb',
//     padding:5,
//     marginVertical:5,
//   },
//   buttontext:{
//     color:'#3b3b66',
//     textAlign:'center',
//     fontWeight:'bold',
//     padding:5,
//     // fontFamily:'DMSerifDisplay',
//   },

// });

// export default Courses;

