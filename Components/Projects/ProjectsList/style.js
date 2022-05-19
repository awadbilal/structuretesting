import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    padding: 20,
    paddingHorizontal: 30,
  },
  container: {
    flex: 1,
    paddingTop: 50,
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
  searchBar: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#1E1F2040',
    borderRadius: 8,
    borderBottomWidth: 0,
    marginBottom: 5,
  },
  project: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
    padding: 20,
    backgroundColor: '#2F3462',
    borderRadius: 16,
  },
  projectTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 24,
    color: '#FEFEFE',
  },
  projectDate: {
    fontSize: 13,
    lineHeight: 20,
    color: '#F7F7F7',
  },
});
