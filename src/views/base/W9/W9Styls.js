import { StyleSheet, Font } from '@react-pdf/renderer'

Font.register({
  family: 'Helvetica',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/helvetica-neue/v1/HelveticaNeue-Regular.ttf',
      fontWeight: 'normal',
    },
    {
      src: 'https://fonts.gstatic.com/s/helvetica-neue/v1/HelveticaNeue-Bold.ttf',
      fontWeight: 'bold',
    },
  ],
})

const styles = StyleSheet.create({
  // General styles
  bold: {
    fontFamily: 'Helvetica-Bold',
    fontWeight: 'bold',
  },
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: 'Helvetica',
    lineHeight: 1.5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerSection: {
    padding: 5,
  },
  headerLeftRight: {
    width: '25%',
    textAlign: 'center',
  },
  headerMiddle: {
    width: '50%',
    textAlign: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headleft: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  leftBottom: {
    fontSize: 10,
    textAlign: 'left',
    color: 'gray',
  },
  headright: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  subtitle: {
    fontSize: 10,
    color: 'gray',
    textAlign: 'center',
    padding: 2,
  },
  stitle: {
    fontSize: 14,

    textAlign: 'left',
    padding: 2,
  },
  headerBottomLine: {
    width: '100%',
    height: 2,
    backgroundColor: '#000',
    marginVertical: 6,
  },

  // Section-specific styles
  section: {
    marginVertical: 16,
    paddingHorizontal: 8,
  },
  bullet: {
    fontWeight: 'bold',
    marginRight: 4,
  },

  // Table styles
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
    padding: 8,
    textAlign: 'left',
    flex: 1,
  },
  tableCell: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#d3d3d3',
    padding: 8,
    flex: 1,
    textAlign: 'left',
  },
  paragraph: {
    marginBottom: 5,
    lineHeight: 1,
  },

  // Bullet point styles within the table
  bulletList: {
    marginVertical: 4,
    marginLeft: 10,
  },
  listItem: {
    marginBottom: 4,
    fontSize: 10,
    flexDirection: 'row',
  },
  link: {
    color: '#0000FF',
    textDecoration: 'underline',
  },

  // Input and label styles
  label: {
    fontSize: 12,
    marginHorizontal: 4,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  checkboxContainer: {
    display: 'flex', // Enables flexible layout
    flexDirection: 'row', // Aligns checkboxes horizontally
    flexWrap: 'wrap', // Allows checkboxes to wrap to the next line
    marginVertical: 10, // Adds space above and below the container
  },
  checkboxItem: {
    width: '33%', // Allocates 1/3rd width for each checkbox to align in rows of three
    marginBottom: 5, // Adds spacing between rows of checkboxes
    flexDirection: 'row', // Aligns checkbox and label horizontally
    alignItems: 'center', // Aligns checkbox and label vertically in the center
  },
  checkboxLabel: {
    marginLeft: 5, // Adds space between the checkbox symbol and the label
    fontSize: 10, // Adjusts the label font size for better readability
  },
  input: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    padding: 5,
    borderRadius: 3,
    width: '100%',
  },
  inputContainer: {
    flex: 1, 
    marginHorizontal: 4, 
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  // TIN Section
  tinSection: {
    marginVertical: 16,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    padding: 8,
  },
  tinHeader: {
    backgroundColor: '#505050',
    color: 'white',
    padding: 4,
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tinRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tinInputContainer: {
    width: '48%',
  },

  tinInput: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    padding: 4,
    borderRadius: 4,
    height: 25,
  },

  // Certification section
  certificationSection: {
    marginVertical: 16,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    padding: 8,
  },
  certificationHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  certificationText: {
    fontSize: 10,
    marginBottom: 4,
    lineHeight: 1.5,
  },
  certificationList: {
    marginLeft: 16,
    marginBottom: 8,
  },
  certificationItem: {
    fontSize: 10,
    marginBottom: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  signatureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    alignItems: 'center',
  },
  signatureLabel: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  signatureInput: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    padding: 5,
    borderRadius: 4,
    width: '45%',
    height: 25,
  },

  // Instructions section
  instructionsSection: {
    marginVertical: 16,
    padding: 10,
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  instructionsHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  instructionsSubHeader: {
    fontSize: 12,
    fontStyle: 'italic',
    marginBottom: 6,
  },
  instructionsText: {
    fontSize: 10,
    marginBottom: 8,
    lineHeight: 1.5,
  },
  linkText: {
    color: '#0000FF',
    textDecoration: 'underline',
  },

  // "What's New" section
  whatsNewHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  whatsNewText: {
    fontSize: 12,
    marginBottom: 8,
    lineHeight: 1.5,
  },

  // Footer
  footer: {
    fontSize: 9,
    marginTop: 20,
    textAlign: 'center',
    color: 'gray',
  },
})

export default styles
