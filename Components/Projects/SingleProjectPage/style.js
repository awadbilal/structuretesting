import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
    paddingHorizontal: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '105%',
    marginBottom: 30,
  },
  input: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    borderBottomWidth: 0,
  },
  font: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '700',
    lineHeight: 24,
    opacity: 1,
  },
  levels: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#3D1273',
    borderRadius: 16,
    marginHorizontal: 10,
  },
  levelsText: {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 20,
    color: '#FEFEFE',
  },
  levelsNumber: {
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 20,
    color: '#F7F7F7',
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: '#1E1F2066',
    borderRadius: 16,
  },
  devices: {
    fontWeight: '700',
    fontSize: 24,
    color: '#FEFEFE',
    marginBottom: 30,
  },
  devicesContainer: {
    backgroundColor: '#1E1F2014',
    borderRadius: 16,
    paddingTop: 20,
    paddingHorizontal: 30,
    width: '100%',
  },
  devicesInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  devicesNumber: {
    width: '15%',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    color: '#F7F7F7',
    padding: 10,
    marginRight: 5,
    backgroundColor: '#3D1273',
    borderRadius: 16,
    textAlign: 'center',
  },
  devicesUser: {
    width: '60%',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 20,
    color: '#FEFEFE',
  },
  devicesRemove: {
    width: '15%',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    color: '#FFFFFF',
    padding: 10,
    backgroundColor: '#FFFFFF14',
    borderRadius: 16,
    textAlign: 'center',
  },
  inviteAndContinue: {
    width: '100%',
    paddingVertical: 14,
    backgroundColor: '#3D1273',
    borderRadius: 16,
    textAlign: 'left',
    marginTop: 20,
  },
  buttonTitle: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 20,
    color: '#FEFEFE',
    textAlign: 'left',
  },
});
