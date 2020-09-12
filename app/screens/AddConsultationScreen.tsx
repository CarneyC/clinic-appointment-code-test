import * as React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Icon } from 'react-native-elements';

import {View} from '../components/Themed';
import {StackScreenProps} from "@react-navigation/stack";
import {RootStackParamList} from "../types";
import {AuthContext} from "../stores/AuthContextProvider";
import {AgendaContext} from "../stores/AgendaContextProvider";
import {IConsultationInputDTO} from "../interfaces/IConsultation";
import {MontserratText} from "../components/StyledText";
import StyledTextInput, {StyledTextInputProps} from "../components/StyledTextInput";
import moment from "moment";
import TouchableButton from "../components/TouchableButton";

type Props = StackScreenProps<RootStackParamList, 'SignIn'>;

const LightTextInput = (props: StyledTextInputProps) =>
  <StyledTextInput
    width="85%"
    backgroundColor="#f2f4f5"
    color="#f26628"
    {...props} />

export default function AddConsultationScreen({navigation}: Props) {
  const [doctor, setDoctor] = React.useState('');
  const [patient, setPatient] = React.useState('');
  const [diagnosis, setDiagnosis] = React.useState('');
  const [medication, setMedication] = React.useState('');
  const [fee, setFee] = React.useState<string>('0');
  const [date, setDate] = React.useState<Date>(new Date());
  const [show, showDate] = React.useState<boolean>(false);

  const dateStr = React.useMemo(() => moment(date).format('MMMM Do hh:mm A'), [date])

  const toggleDatePicker = () => {
    showDate(!show)
  }

  const authContext = React.useContext(AuthContext)
  const agendaContext = React.useContext(AgendaContext)

  const onCreate = () => {
    if (authContext?.state.token && agendaContext) {
      const {token} = authContext.state;
      const {createAgenda} = agendaContext.actions;

      const inputDTO: IConsultationInputDTO = {
        doctor,
        patient,
        diagnosis,
        medication,
        fee: Number(fee),
        date
      }

      createAgenda(token, inputDTO).then();
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoView}>
        <View style={styles.logoBorder}/>
        <View style={styles.logoBody}>
          <MontserratText style={[styles.logoSubtitle, styles.logo]}>Adding</MontserratText>
          <MontserratText style={[styles.logoTitle, styles.logo]}>Consultation</MontserratText>
        </View>
      </View>
      <View style={styles.formView}>
        <LightTextInput
          name="bed-patient"
          type="fontisto"
          onChangeText={setPatient}
        >
          Patient
        </LightTextInput>
        <LightTextInput
          name="doctor"
          type="material-community"
          onChangeText={setDoctor}
        >
          Doctor
        </LightTextInput>
        <LightTextInput
          name="attach-money"
          type="material"
          onChangeText={setFee}
        >
          Fee
        </LightTextInput>
        <TouchableOpacity onPress={toggleDatePicker} style={styles.dateBtn}>
          <LightTextInput
            name="date-range"
            type="material"
            width="100%"
            editable={false}
            value={dateStr}>
            Consultation Date
          </LightTextInput>
        </TouchableOpacity>

        <LightTextInput
          name="stethoscope"
          type="font-awesome"
          onChangeText={setDiagnosis}
          height={120}
          multiline
          showLabel
        >
          Diagnosis
        </LightTextInput>
        <LightTextInput
          name="pill"
          type="material-community"
          onChangeText={setMedication}
          height={120}
          multiline
          showLabel
        >
          Medication
        </LightTextInput>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          is24Hour={true}
          display="default"
          onChange={(event, date) => {
            date && setDate(date);
            showDate(false);
          }}
        />
      )}

      <TouchableButton onPress={onCreate} label="ADD TO AGENDA"/>

      <TouchableOpacity onPress={() => navigation.navigate('Agenda')} style={styles.backBtn}>
        <Icon
          name="angle-left"
          type="font-awesome"
          size={18}
          style={styles.backIcon}
          />
        <MontserratText style={styles.loginText}>Back to agenda</MontserratText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoView: {
    width: '90%',
  },
  logoBorder: {
    backgroundColor: '#f26628',
    height: 24,
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
  },
  logoBody: {
    backgroundColor: '#f9a36c',
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  logoTitle: {
    fontSize: 28,
  },
  logoSubtitle: {
    fontSize: 12,
  },
  logo: {
    color: "#f1f1f1",
  },
  formView: {
    paddingTop: 24,
    paddingBottom: 10,
    width: '90%',
    borderBottomStartRadius: 8,
    borderBottomEndRadius: 8,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  dateBtn: {
    width: "85%",
  },
  backBtn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20
  },
  loginText: {
    color: "black"
  },
  backIcon: {
    paddingRight: 6
  }
});
