import React from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'
import styles from './W9Styls'

const FormPdf = ({ formData }) => (
  <Document>
    <Page size="A3" style={styles.page}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerLeftRight}>
          <Text style={styles.headleft}>Form W-9 </Text>
          <Text style={styles.leftBottom}>
            Department of the Treasury Internal Revenue Service{' '}
          </Text>
        </View>
        <View style={styles.headerMiddle}>
          <Text style={styles.title}>Request for Taxpayer</Text>
          <Text style={styles.title}>Identification Number and Certification</Text>
          <Text style={styles.subtitle}>
            Go to www.irs.gov/FormW9 for instructions and the latest information{' '}
          </Text>
        </View>

        <View style={styles.headerLeftRight}>
          <Text style={styles.headright}>Give form to the requester. Do not send to the IRS.</Text>
        </View>
      </View>
      <Text style={styles.headleft}>
        Before you begin. For guidance related to the purpose of Form W-9, see Purpose of Form,
        below.
      </Text>
      <View style={styles.headerBottomLine} />

      {/* Form Section */}
      <View style={styles.section}>
        <Text style={styles.label}>
          {' '}
          1. Name of entity/individual An entry is required. (For a sole proprietor or disregarded
          entity, enter the owner’s name on line 1, and enter the business/disregarded entity’s name
          on line 2.)
        </Text>
        <Text style={styles.input}>{formData.name || ' '}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>
          2. Business name/disregarded entity name, if different from above
        </Text>
        <Text style={styles.input}>{formData.businessName || ' '}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>
          3a. Check the appropriate box for federal tax classification of the entity/individual
          whose name is entered on line 1. Check only one of the following seven boxes.
          Individual/sole proprietor C c
        </Text>
        <View style={styles.checkboxContainer}>
          {[
            'Individual/sole proprietor',
            'C corporation',
            'S corporation',
            'Partnership',
            'Trust/estate',
            'LLC',
            'Other',
          ].map((option, index) => (
            <View key={index} style={styles.checkboxItem}>
              <Text style={{ fontWeight: formData.classification === option ? 'bold' : 'normal' }}>
                {formData.classification === option ? '☑' : '☐'}
              </Text>
              <Text style={styles.checkboxLabel}>{option}</Text>
            </View>
          ))}
        </View>
        {formData.classification === 'LLC' && (
          <Text>LLC Tax Classification: {formData.llcType || ' '}</Text>
        )}
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>
          4. Exemptions (codes apply only to certain entities, not individuals; see instructions on
          page 3):
        </Text>
        <Text style={styles.input}>{formData.exemptPayee || ' '}</Text>
        <Text style={styles.label}>
          Exemption from Foreign Account Tax Compliance Act (FATCA) reporting code (if any):
        </Text>
        <Text style={styles.input}>{formData.fatcaExemption || ''}</Text>
      </View>

      {/* Address Section */}
      <View style={styles.section}>
        <Text style={styles.label}>5. Address (number, street, apt, suite):</Text>
        <Text style={styles.input}>{formData.address || ''}</Text>
      </View>

      {/* City, State, ZIP Section */}
      <View style={[styles.section, styles.row]}>
        <View style={styles.halfWidth}>
          <Text style={styles.label}>City:</Text>
          <Text style={styles.input}>{formData.city || ''}</Text>
        </View>
        <View style={styles.halfWidth}>
          <Text style={styles.label}>State:</Text>
          <Text style={styles.input}>{formData.state || ''}</Text>
        </View>
      </View>

      <View style={[styles.section, styles.row]}>
        <View style={styles.halfWidth}>
          <Text style={styles.label}>ZIP Code:</Text>
          <Text style={styles.input}>{formData.zipCode || ''}</Text>
        </View>
      </View>

      {/* Account Number Section */}
      <View style={styles.section}>
        <Text style={styles.label}>7. List account number(s) here (optional):</Text>
        <Text style={styles.input}>{formData.accountNumber || ''}</Text>
      </View>

      {/* Requester Section */}
      <View style={styles.section}>
        <Text style={styles.label}>8(a) Requester's name (optional):</Text>
        <Text style={styles.input}>{formData.requesterName || ''}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>8(b) Requester's address (optional):</Text>
        <Text style={styles.input}>{formData.requesterAddress || ''}</Text>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>Form W-9 (Rev. March 2024)</Text>
    </Page>
  </Document>
)

export default FormPdf
