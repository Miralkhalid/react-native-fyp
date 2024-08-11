import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ImageBackground } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Idcard = () => {
  const [studentCard, setStudentCard] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        // Retrieve student_id from AsyncStorage
        const id = await AsyncStorage.getItem('student_card', $student_id);
        
        // Log the retrieved student_id
        console.log(`Retrieved student ID: ${student_id}`);
        
        // Check if student_id is null or undefined
        // if (!id) {
        //   Alert.alert('Error', 'Student ID not found');
        //   setLoading(false);
        //   return;
        // }

        // Fetch card details from API
        console.log(`Fetching card details for student ID: ${student_id}`);
        const response = await axios.get(`http://10.0.2.2:8000/api/student/get-card-detail/${student_id}`);
        
        // Log the API response
        console.log('API Response Data:', response);
        
        // Check if response contains data
        if (response.data.status === 200 && response && response.data.data) {
          setStudentCard(response); // Set student card data
        } else {
          Alert.alert('Error', 'Failed to fetch card details');
          console.log('Failed to fetch card details. Response:', response);
        }
      } catch (error) {
        console.error('Error fetching details:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  console.log('Student Card Data:', studentCard); // Log student card data

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./images/idcard.png')} style={styles.backgroundImage}>
        <Text style={styles.caption}>LAHORE SCHOOL OF INNOVATION & TECHNOLOGY</Text>
        {error ? (
          <Text style={styles.error}>Error: {error}</Text>
        ) : studentCard ? (
          <View style={styles.cardItem}>
            <Text style={styles.style}><Text style={styles.label}>Name: </Text>{studentCard.name}</Text>
            <Text style={styles.style}><Text style={styles.label}>Email: </Text>{studentCard.email}</Text>
            <Text style={styles.style}><Text style={styles.label}>Phone No: </Text>{studentCard.phone_no}</Text>
            <Text style={styles.style}><Text style={styles.label}>Address: </Text>{studentCard.address}</Text>
            <Text style={styles.style}><Text style={styles.label}>Create Date: </Text>{studentCard.create_date}</Text>
          </View>
        ) : (
          <Text style={styles.empty}>No data available</Text>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  caption: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  cardItem: {
    padding: 20,
  },
  style: {
    fontSize: 16,
    marginBottom: 10,
  },
  label: {
    fontWeight: '700',
    color: '#cdcddb',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  empty: {
    textAlign: 'center',
    color: '#888',
  },
});

export default Idcard;


// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Alert, ImageBackground } from 'react-native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Idcard = () => {
//   const [studentCard, setStudentCard] = useState('id');
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCard = async () => {
//       try {
//         const id = await AsyncStorage.getItem('id');
//         if (!id) {
//           console.log(id);
//           Alert.alert('Error', 'Student ID not found');
//           return;
//         }

//         const response = await axios.get(`http://10.0.2.2:8000/api/student/get-card-detail/${id}`);
//         if (response.data.data) {
//           console.log(response.data.data);
//           setStudentCard(response.data.data);
//         } else {
//           Alert.alert('Error', 'Failed to fetch card details');
//         }
//       } catch (error) {
//         console.error('Error fetching details:', error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCard();
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <ImageBackground source={require('./images/idcard.png')} style={{ height: '100%' }}>
//         <Text style={styles.caption}>LAHORE SCHOOL OF INNOVATION & TECHNOLOGY</Text>
//         {error ? (
//           <Text style={styles.error}>Error: {error}</Text>
//         ) : studentCard ? (
//           <View style={styles.cardItem}>
//             <Text style={styles.style}><Text style={{ fontWeight: '700', color: '#cdcddb' }}>Name: </Text>{studentCard.name}</Text>
//             <Text style={styles.style}><Text style={{ fontWeight: '700', color: '#cdcddb' }}>Email: </Text>{studentCard.email}</Text>
//             <Text style={styles.style}><Text style={{ fontWeight: '700', color: '#cdcddb' }}>Phone No: </Text>{studentCard.phone_no}</Text>
//             <Text style={styles.style}><Text style={{ fontWeight: '700', color: '#cdcddb' }}>Address: </Text>{studentCard.address}</Text>
//             <Text style={styles.style}><Text style={{ fontWeight: '700', color: '#cdcddb' }}>Student ID: </Text>{studentCard.student_id}</Text>
//           </View>
//         ) : (
//           <Text style={styles.empty}>No data available</Text>
//         )}
//       </ImageBackground>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: '#fff',
//   },
//   cardItem: {
//     padding: 12,
//     marginVertical: '10%',
//     marginHorizontal: '20%',
//     height: '30%',
//     width: '70%',
//   },
//   style: {
//     fontSize: 16,
//     color: '#cdcddb',
//     marginBottom: 9,
//     fontWeight: '400',
//     paddingTop: 5,
//     marginHorizontal: '5%',
//   },
//   error: {
//     fontSize: 18,
//     color: 'red',
//     textAlign: 'center',
//   },
//   empty: {
//     fontSize: 18,
//     color: '#555',
//     textAlign: 'center',
//     marginTop: 20,
//   },
//   caption: {
//     color: '#cdcddb',
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginHorizontal: '10%',
//     marginTop: '45%',
//   },
// });

// export default Idcard;
