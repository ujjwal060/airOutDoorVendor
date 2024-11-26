import { StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: 'Helvetica',
    lineHeight: 1.5,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerSection: {
    padding: 5,
  },
  headerLeftRight: {
    width: '25%', // Set 40% width for side views
  },
  headerMiddle: {
    width: '40%',
    textAlign: 'center', 
  },
  title: {
    fontSize: 16,
    padding: 2,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headleft: {
    fontSize: 10 ,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  leftBottom: {
    fontSize: 10 ,
    textAlign: 'left',
    color: 'gray',
  },
  headright: {
    fontSize: 10 ,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  subtitle: {
    fontSize: 10,
    color: 'gray',
    textAlign: 'center',
    padding: 2,
  },
  headerBottomLine: {
    width: '100%',  
    height: 2,     
    backgroundColor: '#000',
    marginVertical: 6,  
  },

  section: {
    marginBottom: 15,
  },
  label: {
    // fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    border: '1px solid #000',
    padding: 5,
    borderRadius: 3,
    width: '100%',
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  checkboxItem: {
    width: '33%',
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    marginLeft: 5,
  },
  footer: {
    fontSize: 9,
    marginTop: 20,
    textAlign: 'center',
    color: 'gray',
  },
})

export default styles
