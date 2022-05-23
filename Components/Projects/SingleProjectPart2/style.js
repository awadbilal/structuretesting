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
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  dropdownArea: {
    width: 140,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3D1273',
    borderRadius: 16,
    padding: 10,
  },
  dropdown: {
    height: 50,
    width: '100%',
    backgroundColor: 'transparent',
  },
  dropdownList: {
    backgroundColor: '#FFFFFF80',
    borderRadius: 8,
    borderColor: 'transparent',
  },
  label: {
    position: 'absolute',
    backgroundColor: 'transparent',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    backgroundColor: 'transparent',
    fontSize: 16,
  },
  selectedTextStyle: {
    backgroundColor: 'transparent',
    fontSize: 16,
  },
  infoContainer: {
    backgroundColor: '#1E1F2014',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    height: 300,
    marginTop: 20,
  },
});
