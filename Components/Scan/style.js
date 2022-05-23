import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '700',
  },
  input: {
    fontSize: 12,
    paddingVertical: 10,
    paddingHorizontal: 18,
    backgroundColor: '#FFFFFF25',
    borderRadius: 8,
    borderBottomWidth: 0,
  },
  button: {
    width: '95%',
    paddingVertical: 14,
    backgroundColor: '#3D1273',
    borderRadius: 16,
    alignSelf: 'center',
  },
  qrcode: {
    width: 240,
    height: 240,
    marginVertical: 50,
  },
});
