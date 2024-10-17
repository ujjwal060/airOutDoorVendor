import React from 'react';
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
  CCardBody
} from '@coreui/react';

import Generalinstruction from '../Generalinstruction/Generalinstruction';
import Generalinstruction2 from '../Generalinstruction2/Generalinstruction';

const TaxForm = () => {
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
          Department of the Treasury<br />
          Internal Revenue Service
        </div>
      </div>

      <div style={{ textAlign: 'center', fontSize: '14px' }}>
        <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
          Request for Taxpayer
        </div>
        <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
          Identification Number and Certification
        </div>
        <div style={{ marginTop: '4px' }}>
          Go to <a href="https://www.irs.gov/FormW9">www.irs.gov/FormW9</a> for instructions and the latest information.
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
        <em>Before you begin.</em> For guidance related to the purpose of Form W-9, see <strong>Purpose of Form</strong>, below.
      </div>
    </div>
    
      <CForm>
        {/* 1. Name of entity/individual */}
        <CRow className="mb-3">
          <CCol md="12">
            <CFormLabel htmlFor="name">1. Name of entity/individual  An entry is required. (For a sole proprietor or disregarded entity, enter the owner’s name on line 1, and enter the business/disregarded
              entity’s name on line 2.)</CFormLabel>
            <CFormInput id="name" placeholder="Enter name" required />
          </CCol>
          <CCol md="6">
            <CFormLabel htmlFor="businessName">2. Business name/disregarded entity name, if different from above</CFormLabel>
            <CFormInput id="businessName" placeholder="Enter business name" />
          </CCol>
        </CRow>

        {/* 3a. Federal tax classification */}
        <CRow className="mb-3">
          <CCol md="12">
            <CFormLabel>3a. Check the appropriate box for federal tax classification of the entity/individual whose name is entered on line 1. Check
              only one of the following seven boxes.
              Individual/sole proprietor C c</CFormLabel>
          </CCol>
          <CCol md="4">
            <CFormCheck type="checkbox" id="individual" label="Individual/sole proprietor" />
            <CFormCheck type="checkbox" id="corporation" label="C corporation" />
            <CFormCheck type="checkbox" id="sCorporation" label="S corporation" />
          </CCol>
          <CCol md="4">
            <CFormCheck type="checkbox" id="partnership" label="Partnership" />
            <CFormCheck type="checkbox" id="trust" label="Trust/estate" />
            <CFormCheck type="checkbox" id="llc" label="LLC (Enter tax classification: (C = C corporation, S = S corporation, P = Partnership)" />
            <CFormInput id="llcType" placeholder="C/S/P" />
          </CCol>
          <CCol md="4">
            <CFormCheck type="checkbox" id="other" label="Other (see instructions)" />
          </CCol>
        </CRow>

        {/* 3b. Foreign partners/owners/beneficiaries */}
        <CRow className="mb-3">
          <CCol md="12">
            <CFormCheck type="checkbox" id="foreignPartners" label="3b. If on line 3a you checked 'Partnership' or 'Trust/estate,' or checked 'LLC' and entered 'P' as its tax classification, and you are providing this form to a partnership, trust, or estate in which you have an ownership interest, check this box if you have any foreign partners, owners, or beneficiaries." />
          </CCol>
        </CRow>

        {/* 4. Exemptions */}
        <CRow className="mb-3">
          <CCol md="6">
            <CFormLabel htmlFor="exemptPayee">4.Exemptions (codes apply only to
              certain entities, not individuals;
              see instructions on page 3):</CFormLabel>
            <CFormInput id="exemptPayee" placeholder='Exempt payee code (if any)'/>
          </CCol>
          <CCol md="6">
            <CFormLabel htmlFor="fatcaCode">Exemption from Foreign Account Tax
              Compliance Act (FATCA) reporting
              code (if any)
            </CFormLabel>
            <CFormInput id="fatcaCode" placeholder='(Applies to accounts maintained
outside the United States.)' />
          </CCol>
        </CRow>

        {/* 5. Address */}
        <CRow className="mb-3">
          <CCol md="12">
            <CFormLabel htmlFor="address">5. Address (number, street, apt, suite)</CFormLabel>
            <CFormInput id="address" placeholder="Enter address" required />
          </CCol>
        </CRow>

        {/* 6. City, state, ZIP */}
        <CRow className="mb-3">
          <CCol md="4">
            <CFormLabel htmlFor="city">City</CFormLabel>
            <CFormInput id="city" placeholder="Enter city" required />
          </CCol>
          <CCol md="4">
            <CFormLabel htmlFor="state">State</CFormLabel>
            <CFormInput id="state" placeholder="Enter state" required />
          </CCol>
          <CCol md="4">
            <CFormLabel htmlFor="zip">ZIP Code</CFormLabel>
            <CFormInput id="zip" placeholder="Enter ZIP code" required />
          </CCol>
        </CRow>


        {/* 7. Account number */}
        <CRow className="mb-3">
          <CCol md="4">
            <CFormLabel htmlFor="accountNumber">7. List account number(s) here (optional)</CFormLabel>
            <CFormInput id="accountNumber" rows="2" />
          </CCol>
          <CCol md="4">
            <CFormLabel htmlFor="accountNumber">8(a).Requester’s name (optional)</CFormLabel>
            <CFormInput id="accountNumber" rows="2" />
          </CCol>
          <CCol md="4">
            <CFormLabel htmlFor="accountNumber">8(b).Requester’s address (optional)</CFormLabel>
            <CFormInput id="accountNumber" rows="2" />
          </CCol>
        </CRow>

        {/* Part I: Taxpayer Identification Number (TIN) */}
        <CCard className="mb-3">
          <CCardHeader>Part I: Taxpayer Identification Number (TIN)</CCardHeader>
          <CCardBody>
            <CRow className="mb-3">
              <CCol md="6">
                <CFormLabel htmlFor="ssn">Social security number</CFormLabel>
                <CFormInput id="ssn" placeholder="XXX-XX-XXXX" required />
              </CCol>
              <CCol md="6">
                <CFormLabel htmlFor="ein">Employer identification number (EIN)</CFormLabel>
                <CFormInput id="ein" placeholder="XX-XXXXXXX" />
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
                  <li>The number shown on this form is my correct taxpayer identification number (or I am waiting for a number to be issued to me);</li>
                  <li>I am not subject to backup withholding because:
                    <ul>
                      <li>(a) I am exempt from backup withholding, or</li>
                      <li>(b) I have not been notified by the IRS that I am subject to backup withholding due to a failure to report interest or dividends, or</li>
                      <li>(c) the IRS has notified me that I am no longer subject to backup withholding;</li>
                    </ul>
                  </li>
                  <li>I am a U.S. citizen or other U.S. person (as defined);</li>
                  <li>The FATCA code(s) entered on this form (if any) indicating that I am exempt from FATCA reporting is correct.</li>
                </ol>
                <p>
                  Sign Here: <strong>Signature of U.S. person</strong>
                </p>
                <CRow className="mb-3">
                  <CCol md="6">
                    <CFormLabel htmlFor="signature">Signature</CFormLabel>
                    <CFormInput id="signature" placeholder="Enter signature" required />
                  </CCol>
                  <CCol md="6">
                    <CFormLabel htmlFor="date">Date</CFormLabel>
                    <CFormInput id="date" type="date" required />
                  </CCol>
                </CRow>

              </CCol>
            </CRow>
          </CCardBody>
        </CCard>

      </CForm>

      <CForm>

        < Generalinstruction />
        < Generalinstruction2 />

      </CForm>
    </>
  );
};


export default TaxForm;
