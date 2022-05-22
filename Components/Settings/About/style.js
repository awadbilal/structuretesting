import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  headerInput: {
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
  title: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '700',
  },
  subText: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    color: '#FFFFFF',
  },
});
