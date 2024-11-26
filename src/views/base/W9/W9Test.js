import React, { useState } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import FormPdf from './FormPdf'

function W9Test() {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    classification: '',
    llcType: '',
    exemptPayeeCode: '',
    fatcaExemption: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    accountNumber: '',
    requesterName: '',
    requesterAddress: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <p>
        <strong>Request for Taxpayer Identification Number and Certification</strong>
      </p>
      <p>
        Go to{' '}
        <a href="https://www.irs.gov/FormW9" target="_blank" rel="noopener noreferrer">
          www.irs.gov/FormW9
        </a>{' '}
        for instructions and the latest information.
      </p>
      <p>
        <strong>Give form to the requester. Do not send to the IRS.</strong>
      </p>

      <form>
        {/* Existing Fields */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name">
            <strong>1. Name of entity/individual:</strong>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              marginBottom: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="businessName">
            <strong>2. Business name/disregarded entity name (if different):</strong>
          </label>
          <input
            type="text"
            id="businessName"
            name="businessName"
            value={formData.businessName}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              marginBottom: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>
            <strong>3a. Federal tax classification:</strong>
          </label>
          <div>
            {[
              'Individual/sole proprietor',
              'C corporation',
              'S corporation',
              'Partnership',
              'Trust/estate',
            ].map((type) => (
              <label key={type} style={{ display: 'block', marginBottom: '5px' }}>
                <input
                  type="radio"
                  name="classification"
                  value={type}
                  checked={formData.classification === type}
                  onChange={handleInputChange}
                  style={{ marginRight: '5px' }}
                />
                {type}
              </label>
            ))}
            <label style={{ display: 'block', marginBottom: '5px' }}>
              <input
                type="radio"
                name="classification"
                value="LLC"
                checked={formData.classification === 'LLC'}
                onChange={handleInputChange}
                style={{ marginRight: '5px' }}
              />
              LLC (Enter tax classification:{' '}
              <input
                type="text"
                name="llcType"
                value={formData.llcType}
                onChange={handleInputChange}
                style={{
                  width: '50px',
                  padding: '5px',
                  marginLeft: '5px',
                  border: '1px solid #ccc',
                  borderRadius: '3px',
                }}
              />
              )
            </label>
          </div>
        </div>

        {/* New Fields */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="exemptPayeeCode">
            <strong>4. Exemptions (codes apply only to certain entities, not individuals):</strong>
          </label>
          <input
            type="text"
            id="exemptPayeeCode"
            name="exemptPayeeCode"
            value={formData.exemptPayeeCode}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              marginBottom: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="fatcaExemption">
            <strong>Exemption from FATCA reporting code (if any):</strong>
          </label>
          <input
            type="text"
            id="fatcaExemption"
            name="fatcaExemption"
            value={formData.fatcaExemption}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              marginBottom: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="address">
            <strong>5. Address (number, street, apt, suite):</strong>
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              marginBottom: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="city">
            <strong>City:</strong>
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            style={{
              width: '48%',
              padding: '8px',
              marginTop: '5px',
              marginBottom: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          />
          <label htmlFor="state" style={{ marginLeft: '5%' }}>
            <strong>State:</strong>
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            style={{
              width: '48%',
              padding: '8px',
              marginTop: '5px',
              marginBottom: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="zipCode">
            <strong>ZIP Code:</strong>
          </label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              marginBottom: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="accountNumber">
            <strong>7. List account number(s) here (optional):</strong>
          </label>
          <input
            type="text"
            id="accountNumber"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              marginBottom: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="requesterName">
            <strong>8(a) Requester's name (optional):</strong>
          </label>
          <input
            type="text"
            id="requesterName"
            name="requesterName"
            value={formData.requesterName}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              marginBottom: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="requesterAddress">
            <strong>8(b) Requester's address (optional):</strong>
          </label>
          <input
            type="text"
            id="requesterAddress"
            name="requesterAddress"
            value={formData.requesterAddress}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              marginBottom: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          />
        </div>

        {/* Download PDF */}
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
      </form>
    </div>
  )
}

export default W9Test
