import { View, Text, Button, TextInput, TouchableOpacity,StyleSheet, Alert, useWindowDimensions, Dimensions, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { Divider } from 'react-native-elements';
import NextPrevButton from '../../components/NextPrevButton';
import SubmitButton from '../../components/SubmitButton';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import * as FontAwesomeIcons from '@fortawesome/free-solid-svg-icons'
import { faArrowAltCircleDown } from '@fortawesome/free-regular-svg-icons';
const MultiStepForm = () => {
    var CH4;
    var Y;
    // Selection buttons
    const [selectedButton, setSelectedButton] = useState(null);
    // Step handling
    const [step, setStep] = useState(1);
    const [isVisible, setIsVisible] = useState(true);

    //const elements = useRef(null);
    const [animalCount, setAnimalCount] = useState('');
    const [wasteQuantity, setWasteQuantity] = useState('');
    const [operatingDays, setOperatingDays] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [result, setCalculationResult] = useState(0);
    const metaBusinesses=["Παραγωγή Ελαιόλαδου","Τυροκόμιση Γάλακτος", "Προιόντα Αλευρόμυλων", "Επεξεργασία Κρέατος"]
    const ektrBusinesses=["Αιγοπροβάτων","Πουλερικών","Χοιρινών","Βοοειδών Γαλακτοπαραγωγής","Βοοειδών Κρεατοπαραγωγής"]
    let containerHeight;
    let horizontalLineBottom;
    let middleContainerBottom;
    let inputBtnWidth;
    


    if(step===1){
      containerHeight=250
      horizontalLineBottom=45
      middleContainerBottom=18
      inputBtnWidth=140
    }else if(step===2){
      containerHeight=340
      horizontalLineBottom=93
      middleContainerBottom=67
      inputBtnWidth=170
    }else if(step==3){
      containerHeight=390
      horizontalLineBottom=117
      middleContainerBottom=102
      inputBtnWidth=170
    }else if(step==4){
      containerHeight=300
      horizontalLineBottom=75
      middleContainerBottom=52
      
    }else if(step==5){
      containerHeight=300
      horizontalLineBottom=75
      middleContainerBottom=52
    }
    
    const handleNext = () => {
        if(selectedButton==="Εκτροφή Ζώων" || step===2){
          if(metaBusinesses.includes(selectedButton) || ektrBusinesses.includes(selectedButton) ){
          
            calculateData()
            
          }
          setStep(step+2);
          
        }else if(selectedButton==="" && step!==4){
          Alert.alert("Επιλέξτε κάποιο από τα προαπαιτούμενα πεδία")
        }else if(step===4 && (animalCount==="" || wasteQuantity==="" || operatingDays==="")){
          Alert.alert("Συμπληρώστε τα παρακάτω προαπαιτούμενα πεδία")
        }
        else{
          
          if(metaBusinesses.includes(selectedButton) || ektrBusinesses.includes(selectedButton) ){
          
            calculateData()
            
          }
          setStep(step+1);
          
        }

    }
    const handlePrevious = () => {
        setSelectedButton("")
        if(step === 3){
          setStep(step-2)
        }else{
          setStep(step-1)
        }
    };

    const handleRestart = () => {
      setSelectedButton("")
      setStep(1);
    };
    const calculateData = () => {
      
      if(selectedButton==="Αιγοπροβάτων"){
        Y=150;
        CH4=0.55;
      }
      switch(selectedButton){
        
        case "Πουλερικών":
        case "Poultry":
            return CH4 = 0.60, Y = 30;
            
        case "Χοιρινών":
        case "Pork":
            return CH4 = 0.55, Y = 6;
            
        case "Βοοειδών Γαλακτοπαραγωγής":
        case "Dairy Cattle":
            return CH4 = 0.60, Y = 20;
            
        case "Βοοειδών Κρεατοπαραγωγής":
        case "Beef Cattle":
            return CH4 = 0.55, Y = 50;
            
        case "Παραγωγή Ελαιόλαδου":
        case "Olive Oil Production":
            return CH4 = 0.65,Y = 70;

        case "Τυροκόμιση Γάλακτος":
        case "Milk Cheese Making":
            return CH4 = 0.50, Y = 30;
            
        case "Προιόντα Αλευρόμυλων":
        case "Flour Mill Products":
            return CH4 = 0.60, Y = 800;
            
        case "Επεξεργασία Κρέατος":
        case "Meat Processing":
            return CH4 = 0.70, Y = 80;
      }
      return CH4,Y;
    }
    const calculate = () => {
      
      var operatingDaysValue= parseInt(operatingDays)
      var animalCountValue = parseInt(animalCount)
      var wasteQuantityValue = parseFloat(wasteQuantity)
      var QBGd=Y*wasteQuantityValue
      console.log(Y,CH4)
      var QBGyr=QBGd*365;
      var GHG =1.87*QBGyr*CH4*operatingDaysValue
      
      VDG=QBGd/1.35
      
      var a= -40*Math.log(VDG)+1000
      var CAPEX=a*VDG
  
      var kw=(-0.008*Math.log(VDG)+0.082)*VDG
      var OPEX_electr=20*kw*operatingDaysValue*0.15
      var OPEX_mech=-0.0046*Math.pow(VDG,2)+27.5*VDG-34.8
      var OPEX_monitor=1800*Math.log(VDG)-5300
      var OPEX_labor=10000*Math.log(VDG)-50000
      console.log("VDG: ",VDG)
      console.log("KW: ",kw)
      console.log("OPEX_electr: ",OPEX_electr)
      console.log("Opex_Mech: ",OPEX_mech)
      console.log("Opex_monitor: ",OPEX_monitor)
      console.log("Opex_Labor: ",OPEX_labor)
      console.log("A:",a)
      if(VDG<300){
          OPEX_labor=0;
      }
      var OPEX=OPEX_electr+OPEX_mech+OPEX_monitor+OPEX_labor
      
      var result=[QBGd,GHG.toFixed(3),CAPEX.toFixed(3),OPEX.toFixed(3)]
      // Save the calculation result
      setCalculationResult(result);
      setShowResults(true);
      setAnimalCount("");
      setWasteQuantity("");
      setOperatingDays("");
      
    }

    const handleButtonPress = (buttonName) => {
      setSelectedButton(buttonName);
    };
    
    const styles =  StyleSheet.create({
      backgroundImage: {
        flex:1,
        height: Dimensions.get('window').height,
        alignItems:"center"
         // or 'stretch' if you want to stretch the image
      },
      stepContainer: {
        flex:1,
      },
      container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
        marginTop:'30%',
        height:containerHeight,
        width: 270,
        
        backgroundColor: "#406bb6",
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        
        
      },
      titleContainer:{
        flex:1,
        justifyContent:'flex-start'
      },
      title: {
        fontSize: 14.5,
        fontWeight: 'bold',
        marginTop:13,
        color:'white',
        alignSelf:'center',
        // textDecorationLine:'underline'
      },
      horizontalLine: {
        
        borderBottomColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth, 
        alignSelf:'stretch',
        borderBottomWidth: 1.2,
        position:'relative',
        bottom:horizontalLineBottom
      },
      middleContainer:{
        flex:1,
        justifyContent:'flex-start',
        position:"relative",
        bottom:middleContainerBottom
      },
      
      button: {
        backgroundColor: '#f2f2f2',
        borderRadius: 8,
        padding:0,
        paddingVertical: 8,
        
        marginBottom: 12,
        alignSelf:'center',
        width:inputBtnWidth,
        
        
      },
      buttonText: {
        fontSize: 13.5,
        fontWeight: 'bold',
        textAlign:'center',
        margin:0,
        color:'#434a54'
      },
      selectedButton: {
        backgroundColor: 'gray',
      },
      bottomContainer:{
        marginBottom:12,
        flexDirection:'row',
        justifyContent:"space-between",
        
      },
      
      // For input fields case 4
      input: {
        width: 170,
        height: 40,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 15,
        paddingHorizontal: 8,
        
        fontSize:12.5,
        backgroundColor:'white'
        

      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginTop:16,
      },
      hiddenElement:{
        width:100
      }
      
    });
    
    
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <ImageBackground
      source={require('../../../Biogas_Back.jpg')} 
      style={styles.backgroundImage} resizeMode='cover'>
          <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Επιλέξτε είδος επιχείρησης</Text>
            
          </View>
          <View style={ styles.horizontalLine} />
          <View style={styles.middleContainer}>
          <View style={{ paddingHorizontal: 0 }}>
          <TouchableOpacity style={[styles.button, selectedButton === 'Μεταποίηση' && styles.selectedButton]}
          onPress={() => handleButtonPress('Μεταποίηση')} > 
            <Text style={styles.buttonText}>Μεταποίηση</Text>
          </TouchableOpacity> 
          </View>
          <TouchableOpacity style={[styles.button, selectedButton === 'Εκτροφή Ζώων' && styles.selectedButton]}
          onPress={() => handleButtonPress('Εκτροφή Ζώων')}>  
          <Text style={styles.buttonText}>Εκτροφή Ζώων</Text>
              </TouchableOpacity> 
          </View>
          <View style={styles.bottomContainer}>
               <Text style={styles.hiddenElement}></Text>
              <NextPrevButton title={<FontAwesomeIcon style={{color:"#434a54"}} icon={FontAwesomeIcons.faArrowRightLong} />} handleFunction={handleNext} style={[styles.nextPrevButton]}>  </NextPrevButton>
          </View>
              
          </View>
          </ImageBackground>
          
        );
      case 2:
        return (
          <ImageBackground
            source={require('../../../Biogas_Back.jpg')} 
            style={styles.backgroundImage} resizeMode='cover'>
          <View style={[styles.container,{height:containerHeight}]}>
          
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Επιλέξτε επιχείρηση</Text>
          </View>
          <View style={ styles.horizontalLine} />
          <View style={styles.middleContainer}>
            <TouchableOpacity style={[styles.button, selectedButton === 'Παραγωγή Ελαιόλαδου' && styles.selectedButton]}
                onPress={() => handleButtonPress('Παραγωγή Ελαιόλαδου')} > 
         <Text style={styles.buttonText}>Παραγωγή Ελαιόλαδου</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, selectedButton === 'Τυροκόμιση Γάλακτος' && styles.selectedButton]}
        onPress={() => handleButtonPress('Τυροκόμιση Γάλακτος')} > 
         <Text style={styles.buttonText}>Τυροκόμιση Γάλακτος</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, selectedButton === 'Προιόντα Αλευρόμυλων' && styles.selectedButton]}
        onPress={() => handleButtonPress('Προιόντα Αλευρόμυλων')} > 
         <Text style={styles.buttonText}>Προιόντα Αλευρόμυλων</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, selectedButton === 'Επεξεργασία Κρέατος' && styles.selectedButton]}
        onPress={() => handleButtonPress('Επεξεργασία Κρέατος')} > 
         <Text style={styles.buttonText}>Επεξεργασία Κρέατος</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.bottomContainer}>
            <NextPrevButton title={<FontAwesomeIcon icon={FontAwesomeIcons.faArrowLeftLong} />} handleFunction={handlePrevious} style={[styles.nextPrevButton]}>  </NextPrevButton>
            <NextPrevButton title={<FontAwesomeIcon icon={FontAwesomeIcons.faArrowRightLong} />} handleFunction={handleNext} style={[styles.nextPrevButton]}>  </NextPrevButton>
        </View>
          </View>
          
          </ImageBackground>
        );
        case 3:
          return (
            <ImageBackground
            source={require('../../../Biogas_Back.jpg')} 
            style={styles.backgroundImage} resizeMode='cover'>
            <View style={[styles.container,{height:containerHeight}]}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Επιλέξτε επιχείρηση</Text>
              </View>
              <View style={ styles.horizontalLine} />
              <View style={styles.middleContainer}>
              <TouchableOpacity style={[styles.button, selectedButton === 'Αιγοπροβάτων' && styles.selectedButton]}
        onPress={() => handleButtonPress('Αιγοπροβάτων')} > 
         <Text style={styles.buttonText}>Αιγοπροβάτων</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, selectedButton === 'Πουλερικών' && styles.selectedButton]}
        onPress={() => handleButtonPress('Πουλερικών')} > 
         <Text style={styles.buttonText}>Πουλερικών</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, selectedButton === 'Χοιρινών' && styles.selectedButton]}
        onPress={() => handleButtonPress('Χοιρινών')} > 
         <Text style={styles.buttonText}>Χοιρινών</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, selectedButton === 'Βοοειδών Γαλακτοπαραγωγής' && styles.selectedButton]}
        onPress={() => handleButtonPress('Βοοειδών Γαλακτοπαραγωγής')} > 
         <Text style={styles.buttonText}>Βοοειδών Γαλακτοπαραγωγής</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, selectedButton === 'Βοοειδών Κρεατοπαραγωγής' && styles.selectedButton]}
        onPress={() => handleButtonPress('Βοοειδών Κρεατοπαραγωγής')} > 
         <Text style={styles.buttonText}>Βοοειδών Κρεατοπαραγωγής</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.bottomContainer}>
            <NextPrevButton title={<FontAwesomeIcon icon={FontAwesomeIcons.faArrowLeftLong} />} handleFunction={handlePrevious} style={[styles.nextPrevButton]}>  </NextPrevButton>
            <NextPrevButton title={<FontAwesomeIcon icon={FontAwesomeIcons.faArrowRightLong} />} handleFunction={handleNext} style={[styles.nextPrevButton]}>  </NextPrevButton>
        </View>
            </View>
            </ImageBackground>
          );
      case 4:
        return (
          <ImageBackground
            source={require('../../../Biogas_Back.jpg')} 
            style={styles.backgroundImage} resizeMode='cover'>

          <View style={[styles.container,{height:containerHeight}]}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Δώστε τα απαραίτητα δεδομένα</Text>
      </View>
      

      <View style={ styles.horizontalLine} />
      <View style={styles.middleContainer}>
      <TextInput
        style={styles.input}
        placeholder="Αριθμός ζώων"
        //placeholderTextColor='white'
        value={animalCount}
        onChangeText={text => setAnimalCount(text)}
        keyboardType="numeric"

      />
      <TextInput
        style={styles.input}
        placeholder="Ποσότητες αποβλήτων"
        //placeholderTextColor='#434a54'
        value={wasteQuantity}
        onChangeText={text => setWasteQuantity(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Ημέρες λειτουργίας"
        //placeholderTextColor='white'
        value={operatingDays}
        onChangeText={text => setOperatingDays(text)}
        keyboardType="numeric"
      />
      </View>
      <View style={styles.bottomContainer}>
        <NextPrevButton title={<FontAwesomeIcon icon={FontAwesomeIcons.faArrowLeftLong} />} handleFunction={handlePrevious} style={[styles.nextPrevButton]}>  </NextPrevButton>
        <NextPrevButton
          title={<FontAwesomeIcon icon={FontAwesomeIcons.faArrowRightLong} />}
          handleFunction={() => {
            handleNext();
            calculate();
          }}
          style={[styles.nextPrevButton]}
        />
      </View>
    </View>
    </ImageBackground>
        );
      case 5:
        return (
          <ImageBackground
            source={require('../../../Biogas_Back.jpg')} 
            style={styles.backgroundImage} resizeMode='cover'>
          <View style={[styles.container,{height:containerHeight}]}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Αποτελέσματα</Text>
            </View>
            <View style={styles.middleContainer}>
            <Text>Δυναμικό Παραγωγής Βιοαερίου:{[result[0]]}</Text>
            <Text>Αποφυγή εκπομπών CO2:{[result[1]]}</Text>
            <Text>Κόστος κατασκευής:{[result[2]]}</Text>
            <Text>Κόστος λειτουργίας:{[result[3]]}</Text>
            </View>
            <View style={styles.bottomContainer}>
            <NextPrevButton title={<FontAwesomeIcon icon={FontAwesomeIcons.faArrowLeftLong} />} handleFunction={handlePrevious} style={[styles.nextPrevButton]}>  </NextPrevButton>
        <NextPrevButton
          title={<FontAwesomeIcon icon={FontAwesomeIcons.faRotateForward} />}
          handleFunction={() => {
            handleNext();
            calculate();
          }}
          style={[styles.nextPrevButton]}
        />
        </View>
            
          </View>
          </ImageBackground>
        );
      default:
        return null;
    }
  };
  

  return <View>{renderStep()}</View>;

  
};


export default MultiStepForm