import React, { useState } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import FormPdf from './FormPdf'
import {
  CForm,
  CFormLabel,
  CFormInput,
  CFormTextarea,
  CFormCheck,
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
} from '@coreui/react'

import Generalinstruction from '../Generalinstruction/Generalinstruction'
import Generalinstruction2 from '../Generalinstruction2/Generalinstruction'

const TaxForm = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    federalTaxClassification: {
      individual: false,
      corporation: false,
      sCorporation: false,
      partnership: false,
      trust: false,
      llc: false,
      other: false,
      llcType: '',
    },
    foreignPartners: false,
    exemptPayee: '',
    fatcaCode: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    accountNumber: '',
    requesterName: '',
    requesterAddress: '',
    ssn: '',
    ein: '',
    signature: '',
    date: '',
  })

  // Handler for form input change
  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target

    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        federalTaxClassification: {
          ...prev.federalTaxClassification,
          [id]: checked,
        },
        foreignPartners: id === 'foreignPartners' ? checked : prev.foreignPartners,
      }))
    } else if (id === 'llcType') {
      setFormData((prev) => ({
        ...prev,
        federalTaxClassification: {
          ...prev.federalTaxClassification,
          llcType: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }))
    }
  }

  // Handle form submission (you can adjust according to your needs)
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted with data:', formData)
    // Submit formData to API or server
  }

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr 1fr',
          alignItems: 'center',
          borderBottom: '1px solid #000',
          paddingBottom: '8px',
          marginBottom: '16px',
        }}
      >
        <div style={{ textAlign: 'left', fontSize: '12px' }}>
          <div style={{ fontWeight: 'bold' }}>Form W-9</div>
          <div style={{ fontStyle: 'italic' }}>(Rev. March 2024)</div>
          <div>
            Department of the Treasury
            <br />
            Internal Revenue Service
          </div>
        </div>

        <div style={{ textAlign: 'center', fontSize: '14px' }}>
          <div style={{ fontSize: '16px', fontWeight: 'bold' }}>Request for Taxpayer</div>
          <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
            Identification Number and Certification
          </div>
          <div style={{ marginTop: '4px' }}>
            Go to <a href="https://www.irs.gov/FormW9">www.irs.gov/FormW9</a> for instructions and
            the latest information.
          </div>
        </div>

        <div style={{ textAlign: 'right', fontSize: '12px' }}>
          <strong>Give form to the requester. Do not send to the IRS.</strong>
        </div>

        <div
          style={{
            gridColumn: '1 / -1',
            fontSize: '12px',
            marginTop: '8px',
            textAlign: 'left',
          }}
        >
          <em>Before you begin.</em> For guidance related to the purpose of Form W-9, see{' '}
          <strong>Purpose of Form</strong>, below.
        </div>
      </div>

      <CForm onSubmit={handleSubmit}>
        {/* 1. Name of entity/individual */}
        <CRow className="mb-3">
          <CCol md="12">
            <CFormLabel htmlFor="name">
              1. Name of entity/individual An entry is required. (For a sole proprietor or
              disregarded entity, enter the owner’s name on line 1, and enter the
              business/disregarded entity’s name on line 2.)
            </CFormLabel>
            <CFormInput
              id="name"
              value={formData.name}
              placeholder="Enter name"
              onChange={handleInputChange}
              required
            />
          </CCol>
          <CCol md="6">
            <CFormLabel htmlFor="businessName">
              2. Business name/disregarded entity name, if different from above
            </CFormLabel>
            <CFormInput
              id="businessName"
              value={formData.businessName}
              placeholder="Enter business name"
              onChange={handleInputChange}
            />
          </CCol>
        </CRow>

        {/* 3a. Federal tax classification */}
        <CRow className="mb-3">
          <CCol md="12">
            <CFormLabel>
              3a. Check the appropriate box for federal tax classification of the entity/individual
              whose name is entered on line 1. Check only one of the following seven boxes.
            </CFormLabel>
          </CCol>
          <CCol md="4">
            <CFormCheck
              type="checkbox"
              id="individual"
              label="Individual/sole proprietor"
              checked={formData.federalTaxClassification.individual}
              onChange={handleInputChange}
            />
            <CFormCheck
              type="checkbox"
              id="corporation"
              label="C corporation"
              checked={formData.federalTaxClassification.corporation}
              onChange={handleInputChange}
            />
            <CFormCheck
              type="checkbox"
              id="sCorporation"
              label="S corporation"
              checked={formData.federalTaxClassification.sCorporation}
              onChange={handleInputChange}
            />
          </CCol>
          <CCol md="4">
            <CFormCheck
              type="checkbox"
              id="partnership"
              label="Partnership"
              checked={formData.federalTaxClassification.partnership}
              onChange={handleInputChange}
            />
            <CFormCheck
              type="checkbox"
              id="trust"
              label="Trust/estate"
              checked={formData.federalTaxClassification.trust}
              onChange={handleInputChange}
            />
            <CFormCheck
              type="checkbox"
              id="llc"
              label="LLC (Enter tax classification: (C = C corporation, S = S corporation, P = Partnership)"
              checked={formData.federalTaxClassification.llc}
              onChange={handleInputChange}
            />
            <CFormInput
              id="llcType"
              value={formData.federalTaxClassification.llcType}
              placeholder="C/S/P"
              onChange={handleInputChange}
            />
          </CCol>
          <CCol md="4">
            <CFormCheck
              type="checkbox"
              id="other"
              label="Other (see instructions)"
              checked={formData.federalTaxClassification.other}
              onChange={handleInputChange}
            />
          </CCol>
        </CRow>

        {/* 3b. Foreign partners/owners/beneficiaries */}
        <CRow className="mb-3">
          <CCol md="12">
            <CFormCheck
              type="checkbox"
              id="foreignPartners"
              label="3b. If on line 3a you checked 'Partnership' or 'Trust/estate,' or checked 'LLC' and entered 'P' as its tax classification, and you are providing this form to a partnership, trust, or estate in which you have an ownership interest, check this box if you have any foreign partners, owners, or beneficiaries."
              checked={formData.foreignPartners}
              onChange={handleInputChange}
            />
          </CCol>
        </CRow>

        {/* 4. Exemptions */}
        <CRow className="mb-3">
          <CCol md="6">
            <CFormLabel htmlFor="exemptPayee">
              4.Exemptions (codes apply only to certain entities, not individuals; see instructions
              on page 3):
            </CFormLabel>
            <CFormInput
              id="exemptPayee"
              value={formData.exemptPayee}
              placeholder="Exempt payee code (if any)"
              onChange={handleInputChange}
            />
          </CCol>
          <CCol md="6">
            <CFormLabel htmlFor="fatcaCode">
              Exemption from Foreign Account Tax Compliance Act (FATCA) reporting code (if any)
            </CFormLabel>
            <CFormInput
              id="fatcaCode"
              value={formData.fatcaCode}
              placeholder="(Applies to accounts maintained outside the United States.)"
              onChange={handleInputChange}
            />
          </CCol>
        </CRow>

        {/* Address and other fields continue... */}

        {/* Submit button */}
        <CRow className="mb-3">
          <PDFDownloadLink
            document={<FormPdf formData={formData} />}
            fileName="Form_W9.pdf"
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#0056b3',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '5px',
            }}
          >
            {({ loading }) => (loading ? 'Generating PDF...' : 'Download PDF')}
          </PDFDownloadLink>
        </CRow>
      </CForm>

      <CForm>
        <Generalinstruction />
        <Generalinstruction2 />
      </CForm>
    </>
  )
}

export default TaxForm
