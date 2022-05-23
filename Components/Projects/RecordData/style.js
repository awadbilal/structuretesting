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
});
