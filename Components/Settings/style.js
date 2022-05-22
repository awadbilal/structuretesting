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
  title: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '700',
  },
  itemContainer: {
    paddingTop: 20,
    width: '100%',
  },
  itemInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  icon: {
    width: '20%',
    fontWeight: '600',
    color: '#F7F7F7',
    paddingVertical: 15,
    paddingHorizontal: 5,
    marginRight: 10,
    backgroundColor: '#FFFFFF40',
    borderRadius: 16,
    textAlign: 'center',
  },
  itemButton: {
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 24,
    color: '#FEFEFE',
  },
});
