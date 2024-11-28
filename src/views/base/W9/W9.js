import React, { useState } from 'react'
import { PDFDownloadLink, pdf } from '@react-pdf/renderer'
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
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const TaxForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    classification: '',
    llcType: '',
    exemptPayee: '',
    fatcaExemption: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    accountNumber: '',
    requesterName: '',
    requesterAddress: '',
    socialSecurityNo: '',
    empIDno: '',
    signature: '',
    date: '',
  })
  const handlePdfSubmit = async () => {
    try {
      const vendorId = localStorage.getItem('vendorId')
      const pdfBlob = await pdf(<FormPdf formData={formData} />).toBlob();
      const formDataToSend = new FormData();
      formDataToSend.append('images', pdfBlob, `${formData.name || 'document'}.pdf`);
      formDataToSend.append('vendorId',vendorId);

      const response = await axios.post(
        'http://localhost:8000/pdf/generate-tax-form',
        formDataToSend,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );

      if (response.status === 200) {
        alert('PDF submitted successfully!')
        navigate('/legal')
      } else {
        alert('Error submitting the PDF.')
      }
    } catch (error) {
      alert('Error submitting the PDF.')
    }
  }
  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }))
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

      <CForm>
        {/* 1. Name of entity/individual */}
        <CRow className="mb-3">
          <CCol md="12">
            <CFormLabel htmlFor="name">
              1. Name of entity/individual An entry is required. (For a sole proprietor or
              disregarded entity, enter the owner’s name on line 1, and enter the
              business/disregarded entity’s name on line 2.)
            </CFormLabel>
            <CFormInput id="name" onChange={handleChange} placeholder="Enter name" required />
          </CCol>
          <CCol md="6">
            <CFormLabel htmlFor="businessName">
              2. Business name/disregarded entity name, if different from above
            </CFormLabel>
            <CFormInput
              id="businessName"
              onChange={handleChange}
              placeholder="Enter business name"
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

          {/* First Column */}
          <CCol md="4">
            <CFormCheck
              type="checkbox"
              id="individual"
              label="Individual/sole proprietor"
              checked={formData.classification === 'Individual/sole proprietor'}
              onChange={() =>
                setFormData((prev) => ({ ...prev, classification: 'Individual/sole proprietor' }))
              }
            />
            <CFormCheck
              type="checkbox"
              id="corporation"
              label="C corporation"
              checked={formData.classification === 'C corporation'}
              onChange={() => setFormData((prev) => ({ ...prev, classification: 'C corporation' }))}
            />
            <CFormCheck
              type="checkbox"
              id="sCorporation"
              label="S corporation"
              checked={formData.classification === 'S corporation'}
              onChange={() => setFormData((prev) => ({ ...prev, classification: 'S corporation' }))}
            />
          </CCol>

          {/* Second Column */}
          <CCol md="4">
            <CFormCheck
              type="checkbox"
              id="partnership"
              label="Partnership"
              checked={formData.classification === 'Partnership'}
              onChange={() => setFormData((prev) => ({ ...prev, classification: 'Partnership' }))}
            />
            <CFormCheck
              type="checkbox"
              id="trust"
              label="Trust/estate"
              checked={formData.classification === 'Trust/estate'}
              onChange={() => setFormData((prev) => ({ ...prev, classification: 'Trust/estate' }))}
            />
            <CFormCheck
              type="checkbox"
              id="llc"
              label="LLC (Enter tax classification: (C = C corporation, S = S corporation, P = Partnership))"
              checked={formData.classification === 'LLC'}
              onChange={() => setFormData((prev) => ({ ...prev, classification: 'LLC' }))}
            />
            {formData.classification === 'LLC' && (
              <CFormInput
                id="llcType"
                placeholder="C/S/P"
                value={formData.llcType}
                onChange={(e) => setFormData((prev) => ({ ...prev, llcType: e.target.value }))}
              />
            )}
          </CCol>

          {/* Third Column */}
          <CCol md="4">
            <CFormCheck
              type="checkbox"
              id="other"
              label="Other (see instructions)"
              checked={formData.classification === 'Other'}
              onChange={() => setFormData((prev) => ({ ...prev, classification: 'Other' }))}
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
              onChange={handleChange}
              placeholder="Exempt payee code (if any)"
            />
          </CCol>
          <CCol md="6">
            <CFormLabel htmlFor="fatcaCode">
              Exemption from Foreign Account Tax Compliance Act (FATCA) reporting code (if any)
            </CFormLabel>
            <CFormInput
              id="fatcaCode"
              onChange={handleChange}
              placeholder="(Applies to accounts maintained
outside the United States.)"
            />
          </CCol>
        </CRow>

        {/* 5. Address */}
        <CRow className="mb-3">
          <CCol md="12">
            <CFormLabel htmlFor="address">5. Address (number, street, apt, suite)</CFormLabel>
            <CFormInput id="address" onChange={handleChange} placeholder="Enter address" required />
          </CCol>
        </CRow>

        {/* 6. City, state, ZIP */}
        <CRow className="mb-3">
          <CCol md="4">
            <CFormLabel htmlFor="city">City</CFormLabel>
            <CFormInput id="city" onChange={handleChange} placeholder="Enter city" required />
          </CCol>
          <CCol md="4">
            <CFormLabel htmlFor="state">State</CFormLabel>
            <CFormInput id="state" onChange={handleChange} placeholder="Enter state" required />
          </CCol>
          <CCol md="4">
            <CFormLabel htmlFor="zipCode">ZIP Code</CFormLabel>
            <CFormInput
              id="zipCode"
              onChange={handleChange}
              placeholder="Enter ZIP code"
              required
            />
          </CCol>
        </CRow>

        {/* 7. Account number */}
        <CRow className="mb-3">
          <CCol md="4">
            <CFormLabel htmlFor="accountNumber">
              7. List account number(s) here (optional)
            </CFormLabel>
            <CFormInput id="accountNumber" onChange={handleChange} rows="2" />
          </CCol>
          <CCol md="4">
            <CFormLabel htmlFor="requesterName">8(a).Requester’s name (optional)</CFormLabel>
            <CFormInput id="requesterName" onChange={handleChange} rows="2" />
          </CCol>
          <CCol md="4">
            <CFormLabel htmlFor="requesterAddress">8(b).Requester’s address (optional)</CFormLabel>
            <CFormInput id="requesterAddress" onChange={handleChange} rows="2" />
          </CCol>
        </CRow>

        {/* Part I: Taxpayer Identification Number (TIN) */}
        <CCard className="mb-3">
          <CCardHeader>Part I: Taxpayer Identification Number (TIN)</CCardHeader>
          <CCardBody>
            <CRow className="mb-3">
              <CCol md="6">
                <CFormLabel htmlFor="socialSecurityNo">Social security number</CFormLabel>
                <CFormInput
                  id="socialSecurityNo"
                  onChange={handleChange}
                  placeholder="XXX-XX-XXXX"
                  required
                />
              </CCol>
              <CCol md="6">
                <CFormLabel htmlFor="empIDno">Employer identification number (EIN)</CFormLabel>
                <CFormInput id="empIDno" onChange={handleChange} placeholder="XX-XXXXXXX" />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>

        {/* Part II: Certification */}
        <CCard className="mb-3">
          <CCardHeader>Part II: Certification</CCardHeader>
          <CCardBody>
            <CRow>
              <CCol>
                <p>Under penalties of perjury, I certify that:</p>
                <ol>
                  <li>
                    The number shown on this form is my correct taxpayer identification number (or I
                    am waiting for a number to be issued to me);
                  </li>
                  <li>
                    I am not subject to backup withholding because:
                    <ul>
                      <li>(a) I am exempt from backup withholding, or</li>
                      <li>
                        (b) I have not been notified by the IRS that I am subject to backup
                        withholding due to a failure to report interest or dividends, or
                      </li>
                      <li>
                        (c) the IRS has notified me that I am no longer subject to backup
                        withholding;
                      </li>
                    </ul>
                  </li>
                  <li>I am a U.S. citizen or other U.S. person (as defined);</li>
                  <li>
                    The FATCA code(s) entered on this form (if any) indicating that I am exempt from
                    FATCA reporting is correct.
                  </li>
                </ol>
                <p>
                  Sign Here: <strong>Signature of U.S. person</strong>
                </p>
                <CRow className="mb-3">
                  <CCol md="6">
                    <CFormLabel htmlFor="signature">Signature</CFormLabel>
                    <CFormInput
                      id="signature"
                      onChange={handleChange}
                      placeholder="Enter signature"
                      required
                    />
                  </CCol>
                  <CCol md="6">
                    <CFormLabel htmlFor="date">Date</CFormLabel>
                    <CFormInput id="date" onChange={handleChange} type="date" required />
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CForm>

      <CForm>
        <Generalinstruction />
        <Generalinstruction2 />
      </CForm>
      <button
        onClick={handlePdfSubmit}
        style={{
          float: 'right',
          margin: '20px',
          padding: '10px 20px',
          backgroundColor: '#0056b3',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '5px',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Submit Now
      </button>
      {/* <PDFDownloadLink
        document={<FormPdf formData={formData} />}
        fileName={formData.name}
        style={{
          float: 'right',
          margin: '20px',
          padding: '10px 20px',
          backgroundColor: '#0056b3',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '5px',
        }}
      >
        {({ loading }) => (loading ? 'Generating PDF...' : 'Submit Now')}
      </PDFDownloadLink> */}
    </>
  )
}

export default TaxForm
