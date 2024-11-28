import React from 'react'
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer'
import styles from './styles'

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
              <Text >
                {formData.classification === option ? <Text style={styles.bold}>{`[Yes]`}</Text> : <Text>{`[No]`}</Text>}
              </Text>
              <Text style={styles.checkboxLabel}>{option} </Text>
            </View>
          ))}
        </View>

        {/* Conditional rendering for LLC */}
        {formData.classification === 'LLC' && (
          <Text style={styles.llcInput}>LLC Tax Classification: {formData.llcType || 'N/A'}</Text>
        )}
      </View>

      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            4. Exemptions (codes apply only to certain entities, not individuals; see instructions
            on page 3):
          </Text>
          <Text style={styles.input}>{formData.exemptPayee || ' '}</Text>
        </View>

        {/* FATCA Exemption Field */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            Exemption from Foreign Account Tax Compliance Act (FATCA) reporting code (if any):
          </Text>
          <Text style={styles.input}>{formData.exemptPayee || ' '}</Text>
        </View>
      </View>

      {/* Address Section */}
      <View style={styles.section}>
        <Text style={styles.label}>5. Address (number, street, apt, suite):</Text>
        <Text style={styles.input}>{formData.address || ' '}</Text>
      </View>
      {/* City, State, ZIP Section */}
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>City:</Text>
          <Text style={styles.input}>{formData.city || ' '}</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>State:</Text>
          <Text style={styles.input}>{formData.state || ' '}</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Zip Code</Text>
          <Text style={styles.input}>{formData.zipCode || ' '}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>6.List account number(s) here (optional)</Text>
          <Text style={styles.input}>{formData.accountNumber || ' '}</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>7(a).Requester’s name (optional)</Text>
          <Text style={styles.input}>{formData.requesterName || ' '}</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>7(b).Requester’s address (optional)</Text>
          <Text style={styles.input}>{formData.requesterAddress || ' '}</Text>
        </View>
      </View>

      <View style={styles.tinSection}>
        <Text style={styles.tinHeader}>Part I: Taxpayer Identification Number (TIN)</Text>
        <View style={styles.certificationBelow}>
          <View style={styles.tinRow}>
            <View style={styles.tinInputContainer}>
              <Text style={styles.label}>Social security number</Text>
              <View style={styles.tinInput}>
                <Text>{formData.socialSecurityNo || ' '}</Text>
              </View>
            </View>
            <View style={styles.tinInputContainer}>
              <Text style={styles.label}>Employer identification number (EIN)</Text>
              <View style={styles.tinInput}>
                <Text>{formData.empIDno || ' '}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* certificaton section    */}
      <View style={styles.certificationSection}>
        <Text style={styles.tinHeader}>Part II: Certification</Text>
        <View style={styles.certificationBelow}>
          <Text style={styles.certificationText}>Under penalties of perjury, I certify that:</Text>
          <View style={styles.certificationList}>
            <Text style={styles.certificationItem}>
              1. The number shown on this form is my correct taxpayer identification number (or I am
              waiting for a number to be issued to me);
            </Text>
            <Text style={styles.certificationItem}>
              2. I am not subject to backup withholding because:
            </Text>
            <View style={styles.certificationList}>
              <Text style={styles.certificationItem}>
                (a) I am exempt from backup withholding, or
              </Text>
              <Text style={styles.certificationItem}>
                (b) I have not been notified by the IRS that I am subject to backup withholding due
                to a failure to report interest or dividends, or
              </Text>
              <Text style={styles.certificationItem}>
                (c) The IRS has notified me that I am no longer subject to backup withholding;
              </Text>
            </View>
            <Text style={styles.certificationItem}>
              3. I am a U.S. citizen or other U.S. person (as defined);
            </Text>
            <Text style={styles.certificationItem}>
              4. The FATCA code(s) entered on this form (if any) indicating that I am exempt from
              FATCA reporting is correct.
            </Text>
          </View>
          <View style={styles.signatureRow}>
            <Text style={styles.signatureLabel}>Sign Here: Signature of U.S. person</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Signature:</Text>
              <Text style={styles.input}> {formData.signature || ' '} </Text>
            </View>

            {/* FATCA Exemption Field */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Date</Text>
              <Text style={styles.input}>{formData.date || ' '}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.instructionsSection}>
        <Text style={styles.instructionsHeader}>General Instructions</Text>
        <Text style={styles.instructionsText}>
          Section references are to the Internal Revenue Code unless otherwise noted.
        </Text>
        <Text style={styles.instructionsSubHeader}>Future developments.</Text>
        <Text style={styles.instructionsText}>
          For the latest information about developments related to Form W-9 and its instructions,
          such as legislation enacted after they were published.
        </Text>
      </View>
      <Text style={styles.whatsNewHeader}>What's New</Text>
      <Text style={styles.whatsNewText}>
        Line 3a has been modified to clarify how a disregarded entity completes this line. An LLC
        that is a disregarded entity should check the appropriate box for the tax classification of
        its owner. Otherwise, it should check the "LLC" box and enter its appropriate tax
        classification.
      </Text>
      <Text style={styles.whatsNewText}>
        New line 3b has been added to this form. A flow-through entity is required to complete this
        line to indicate that it has direct or indirect foreign partners, owners, or beneficiaries
        when it provides the Form W-9 to another flow-through entity in which it has an ownership
        interest. This change is intended to provide a flow-through entity with information
        regarding the status of its indirect foreign partners, owners, or beneficiaries, so that it
        can satisfy any applicable reporting requirements. For example, a partnership that has any
        indirect foreign partners may be required to complete Schedules K-2 and K-3. See the
        Partnership Instructions for Schedules K-2 and K-3 (Form 1065).
      </Text>
      <Text style={styles.instructionsHeader}>Purpose of Form</Text>
      <Text style={styles.whatsNewText}>
        An individual or entity (Form W-9 requester) who is required to file an information return
        with the IRS is giving you this form because theymust obtain your correct taxpayer
        identification number (TIN), which may be your social security number (SSN), individual
        taxpayer identification number (ITIN), adoption taxpayer identification number (ATIN), or
        employer identification number (EIN), to report on an information return the amount paid to
        you, or other amount reportable on an information return. Examples of information returns
        include, but are not limited to, the following.
      </Text>
      <View style={styles.section}>
        <Text style={styles.label}>• Form 1099-INT: Interest earned or paid.</Text>
        <Text style={styles.label}>
          • Form 1099-DIV: Dividends, including those from stocks or mutual funds.
        </Text>
        <Text style={styles.label}>
          • Form 1099-MISC: Various types of income, prizes, awards, or gross proceeds.
        </Text>
        <Text style={styles.label}>• Form 1099-NEC: Nonemployee compensation.</Text>
        <Text style={styles.label}>
          • Form 1099-B: Stock or mutual fund sales and certain other transactions by brokers.
        </Text>
        <Text style={styles.label}>• Form 1099-S: Proceeds from real estate transactions.</Text>
        <Text style={styles.label}>
          • Form 1099-K: Merchant card and third-party network transactions.
        </Text>
        <Text style={styles.label}>• Form 1098: Home mortgage interest.</Text>
        <Text style={styles.label}>• Form 1098-E: Student loan interest.</Text>
        <Text style={styles.label}>• Form 1098-T: Tuition.</Text>
        <Text style={styles.label}>• Form 1099-C: Canceled debt.</Text>
        <Text style={styles.label}>
          • Form 1099-A: Acquisition or abandonment of secured property.
        </Text>
      </View>
      <Text style={styles.instructionsHeader}>Caution</Text>
      <Text style={styles.whatsNewText}>
        If you don’t return Form W-9 to the requester with a TIN, you might be subject to backup
        withholding. See What is backup withholding, later.
      </Text>

      <Text style={styles.instructionsHeader}>By signing the filled-out form,</Text>
      <View style={styles.section}>
        <Text style={styles.label}>
          1. Certify that the TIN you are giving is correct (or you are waiting for a number to be
          issued).
        </Text>
        <Text style={styles.label}>2. Certify that you are not subject to backup withholding.</Text>
        <Text style={styles.label}>
          3. Claim exemption from backup withholding if you are a U.S. exempt payee.
        </Text>
        <Text style={styles.label}>
          4. Certify to your non-foreign status for purposes of withholding under chapter 3 or 4 of
          the Code (if applicable).
        </Text>
        <Text style={styles.label}>
          5. Certify that FATCA code(s) entered on this form (if any) indicating that you are exempt
          from the FATCA reporting is correct.
        </Text>
        <Text style={styles.label}>
          &nbsp;&nbsp;See *What Is FATCA Reporting*, later, for further information.
        </Text>
      </View>
      <View style={styles.section}>
        {/* Note */}
        <Text style={styles.label}>
          <Text style={styles.instructionsHeader}>Note: </Text>
          If you are a U.S. person and a requester gives you a form other than Form W-9 to request
          your TIN, you must use the requester’s form if it is substantially similar to this Form
          W-9.
        </Text>
      </View>

      {/* Definition of a U.S. person */}
      <View style={styles.label}>
        <Text style={styles.instructionsHeader}>Definition of a U.S. person. </Text>
        <Text>For federal tax purposes, you are considered a U.S. person if you are:</Text>
        <View style={styles.bulletList}>
          <Text>• An individual who is a U.S. citizen or U.S. resident alien;</Text>
          <Text>
            • A partnership, corporation, company, or association created or organized in the United
            States or under the laws of the United States;
          </Text>
          <Text>• An estate (other than a foreign estate); or</Text>
          <Text>• A domestic trust (as defined in Regulations section 301.7701-7).</Text>
        </View>
      </View>

      {/* Establishing U.S. status */}
      <View style={styles.label}>
        <Text style={styles.instructionsHeader}>
          Establishing U.S. status for purposes of chapter 3 and chapter 4 withholding.
        </Text>
        <Text>
          Payments made to foreign persons, including certain distributions, allocations of income,
          or transfers of sales proceeds, may be subject to withholding under chapter 3 or chapter 4
          of the Code (sections 1441–1474). Under those rules, if a Form W-9 or other certification
          of non-foreign status has not been received, a withholding agent, transferee, or
          partnership (payor) generally applies presumption rules that may require the payor to
          withhold applicable tax from the recipient, owner, transferor, or partner (payee). See
          Pub. 515, Withholding of Tax on Nonresident Aliens and Foreign Entities.
        </Text>
      </View>

      {/* Specific cases */}
      <View style={styles.label}>
        <Text>
          The following persons must provide Form W-9 to the payor for purposes of establishing
          their non-foreign status:
        </Text>
        <View style={styles.bulletList}>
          <Text>
            • In the case of a disregarded entity with a U.S. owner, the U.S. owner of the
            disregarded entity and not the disregarded entity.
          </Text>
          <Text>
            • In the case of a grantor trust with a U.S. grantor or other U.S. owner, generally, the
            U.S. grantor or other U.S. owner of the grantor trust and not the grantor trust.
          </Text>
          <Text>
            • In the case of a U.S. trust (other than a grantor trust), the U.S. trust and not the
            beneficiaries of the trust.
          </Text>
        </View>
        <Text>
          See Pub. 515 for more information on providing a Form W-9 or a certification of
          non-foreign status to avoid withholding.
        </Text>
      </View>
      <View style={styles.label}>
        <Text style={styles.instructionsHeader}>Foreign person. </Text>
        <Text style={styles.paragraph}>
          If you are a foreign person or the U.S. branch of a foreign bank that has elected to be
          treated as a U.S. person (under Regulations section 1.1441-1(b)(2)(iv) or other applicable
          section for chapter 3 or 4 purposes), do not use Form W-9. Instead, use the appropriate
          Form W-8 or Form 8233 (see Pub. 515). If you are a qualified foreign pension fund under
          Regulations section 1.897(l)-1(d), or a partnership that is wholly owned by qualified
          foreign pension funds, that is treated as a non-foreign person for purposes of section
          1445 withholding, do not use Form W-9. Instead, use Form W-8EXP (or other certification of
          non-foreign status).
        </Text>
      </View>
      <View style={styles.label}>
        <Text style={styles.instructionsHeader}>
          Nonresident alien who becomes a resident alien.
        </Text>
        <Text style={styles.paragraph}>
          Generally, only a nonresident alien individual may use the terms of a tax treaty to reduce
          or eliminate U.S. tax on certain types of income. However, most tax treaties contain a
          provision known as a saving clause. Exceptions specified in the saving clause may permit
          an exemption from tax to continue for certain types of income even after the payee has
          otherwise become a U.S. resident alien for tax purposes. If you are a U.S. resident alien
          who is relying on an exception contained in the saving clause of a tax treaty to claim an
          exemption from U.S. tax on certain types of income, you must attach a statement to Form
          W-9 that specifies the following five items: The treaty country. Generally, this must be
          the same treaty under which you claimed exemption from tax as a nonresident alien. The
          treaty article addressing the income. The article number (or location) in the tax treaty
          that contains the saving clause and its exceptions. The type and amount of income that
          qualifies for the exemption from tax. Sufficient facts to justify the exemption from tax
          under the terms of the treaty article. <Text style={styles.bold}>Example:</Text> Article
          20 of the U.S.-China income tax treaty allows an exemption from tax for scholarship income
          received by a Chinese student temporarily present in the United States. Under U.S. law,
          this student will become a resident alien for tax purposes if their stay in the United
          States exceeds 5 calendar years. However, paragraph 2 of the first Protocol to the
          U.S.-China treaty (dated April 30, 1984) allows the provisions of Article 20 to continue
          to apply even after the Chinese student becomes a resident alien of the United States. A
          Chinese student who qualifies for this exception (under paragraph 2 of the first Protocol)
          and is relying on this exception to claim an exemption from tax on their scholarship or
          fellowship income would attach to Form W-9 a statement that includes the information
          described above to support that exemption. If you are a nonresident alien or a foreign
          entity, give the requester the appropriate completed Form W-8 or Form 8233.
        </Text>
      </View>
      <View style={styles.label}>
        <Text style={styles.instructionsHeader}>Backup Withholding</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}> What is backup withholding? </Text>Persons making certain
          payments to you must under certain conditions withhold and pay to the IRS 24% of such
          payments. This is called “backup withholding.” Payments that may be subject to backup
          withholding include, but are not limited to, interest, tax-exempt interest, dividends,
          broker and barter exchange transactions, rents, royalties, nonemployee pay, payments made
          in settlement of payment card and third-party network transactions, and certain payments
          from fishing boat operators. Real estate transactions are not subject to backup
          withholding. You will not be subject to backup withholding on payments you receive if you
          give the requester your correct TIN, make the proper certifications, and report all your
          taxable interest and dividends on your tax return. Payments you receive will be subject to
          backup withholding if: You do not furnish your TIN to the requester; You do not certify
          your TIN when required (see the instructions for Part II for details); The IRS tells the
          requester that you furnished an incorrect TIN; The IRS tells you that you are subject to
          backup withholding because you did not report all your interest and dividends on your tax
          return (for reportable interest and dividends only); or You do not certify to the
          requester that you are not subject to backup withholding, as described in item 4 under “By
          signing the filled-out form” above (for reportable interest and dividend accounts opened
          after 1983 only). Certain payees and payments are exempt from backup withholding. See
          Exempt payee code, later, and the separate Instructions for the Requester of Form W-9 for
          more information. See also Establishing U.S. status for purposes of chapter 3 and chapter
          4 withholding, earlier.
        </Text>
      </View>
      <View style={[styles.paragraph]}>
        <Text style={[styles.instructionsHeader]}>Is FATCA Reporting? </Text>
        <Text style={[styles.paragraph]}>
          The Foreign Account Tax Compliance Act (FATCA) requires a participating foreign financial
          institution to report all U.S. account holders that are specified U.S. persons. Certain
          payees are exempt from FATCA reporting. See Exemption from FATCA reporting code, later,
          and the Instructions for the Requester of Form W-9 for more information.
        </Text>
      </View>
      <View style={styles.label}>
        <Text style={styles.instructionsHeader}>Updating Your Information </Text>
        <Text style={[styles.paragraph]}>
          You must provide updated information to any person to whom you claimed to be an exempt
          payee if you are no longer an exempt payee and anticipate receiving reportable payments in
          the future from this person.{' '}
        </Text>
        <Text>
          • In addition, you must furnish a new Form W-9 if the name or TIN changes for the account,
          for example, if the grantor of a grantor trust dies.
        </Text>
        <Text>
          • For example, you may need to provide updated information if you are a C corporation that
          elects to be an S corporation, or if you are no longer tax exempt.
        </Text>
      </View>
      <View style={styles.label}>
        <Text style={styles.instructionsHeader}>Penalties</Text>
        <Text>
          • Failure to furnish TIN: If you fail to furnish your correct TIN to a requester, you are
          subject to a penalty of $50 for each such failure unless your failure is due to reasonable
          cause and not to willful neglect.
        </Text>
        <Text>
          • Civil penalty for false information with respect to withholding: If you make a false
          statement with no reasonable basis that results in no backup withholding, you are subject
          to a $500 penalty.
        </Text>
        <Text>
          • Criminal penalty for falsifying information: Willfully falsifying certifications or
          affirmations may subject you to criminal penalties including fines and/or imprisonment.
        </Text>
        <Text>
          • Misuse of TINs: If the requester discloses or uses TINs in violation of federal law, the
          requester may be subject to civil and criminal penalties.
        </Text>
      </View>
      <View style={styles.label}>
        <Text style={styles.instructionsHeader}>Specific Instructions</Text>
        <Text style={styles.bold}>Line 1</Text>
        <Text>
          You must enter one of the following on this line; do not leave this line blank. The name
          should match the name on your tax return.
        </Text>
        <Text>
          • Individual: Enter the name shown on your tax return. If you have changed your last name
          without informing the Social Security Administration (SSA) of the name change, enter your
          first name, the last name as shown on your social security card, and your new last name.
          Note for ITIN applicant: Enter your individual name as it was entered on your Form W-7
          application, line 1a.
        </Text>
        <Text>
          • Sole proprietor: Enter your individual name as shown on your Form 1040 on line 1. Enter
          your business, trade, or “doing business as” (DBA) name on line 2.
        </Text>
        <Text>
          • Partnership, C corporation, S corporation, or LLC: Enter the entity’s name as shown on
          the entity’s tax return on line 1 and any business, trade, or DBA name on line 2.
        </Text>
        <Text>
          • Other entities: Enter your name as shown on required U.S. federal tax documents on line
          1. This name should match the name shown on the charter or other legal document creating
          the entity. Enter any business, trade, or DBA name on line 2.
        </Text>
        <Text>
          • Disregarded entity: Enter the owner’s name on line 1. The name on line 1 should be the
          name shown on the income tax return on which the income should be reported.t: Enter your
          individual name as it was entered on your Form W-7 application, line 1a.
        </Text>
        <Text style={styles.instructionsHeader}>Line 2</Text>
        <Text>
          If you have a business name, trade name, DBA name, or disregarded entity name, enter it on
          line 2.
        </Text>
        <Text style={styles.instructionsHeader}>Line 3a</Text>
        <Text>
          Check the appropriate box on line 3a for the U.S. federal tax classification of the person
          whose name is entered on line 1. Check only one box on line 3a.
        </Text>
      </View>
      <Text style={styles.instructionsHeader}>Entity Classification Table</Text>
      {/* Table */}
      <View style={styles.table}>
        {/* Header Row */}
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>IF the entity/individual on line 1 is a(n)</Text>
          <Text style={styles.tableHeader}>THEN check the box for . . .</Text>
        </View>
        {/* Data Rows */}
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Corporation</Text>
          <Text style={styles.tableCell}>Corporation.</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Individual or Sole proprietorship</Text>
          <Text style={styles.tableCell}>Individual/sole proprietor.</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>
            LLC classified as a partnership for U.S. federal tax purposes
          </Text>
          <View style={styles.tableCell}>
            <Text>Limited liability company and enter the appropriate tax classification:</Text>
            <View style={styles.bulletList}>
              <Text style={styles.listItem}>• P = Partnership</Text>
              <Text style={styles.listItem}>• C = C corporation</Text>
              <Text style={styles.listItem}>• S = S corporation</Text>
            </View>
          </View>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Partnership</Text>
          <Text style={styles.tableCell}>Partnership.</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Trust/estate</Text>
          <Text style={styles.tableCell}>Trust/estate.</Text>
        </View>
      </View>
      <View style={[ styles.paragraph]}>
        <Text style={styles.bold}>Line 3b</Text>
        <Text style={styles.paragraph}>
          Check this box if you are a partnership (including an LLC classified as a partnership for
          U.S. federal tax purposes), trust, or estate that has any foreign partners, owners, or
          beneficiaries, and you are providing this form to a partnership, trust, or estate, in
          which you have an ownership interest. You must check the box on line 3b if you receive a
          Form W-8 (or documentary evidence) from any partner, owner, or beneficiary establishing
          foreign status or if you receive a Form W-9 from any partner, owner, or beneficiary that
          has checked the box on line 3b.
        </Text>

        <Text style={styles.paragraph}>
          Note: A partnership that provides a Form W-9 and checks box 3b may be required to complete
          Schedules K-2 and K-3 (Form 1065). For more information, see the Partnership Instructions
          for Schedules K-2 and K-3 (Form 1065).
        </Text>
        <Text>
          If you are required to complete line 3b but fail to do so, you may not receive the
          information necessary to file a correct information return with the IRS or furnish a
          correct payee statement to your partners or beneficiaries. See, for example, sections
          6698, 6722, and 6724 for penalties that may apply.
        </Text>
        <Text style={styles.whatsNewHeader}>Line 4 Exemptions</Text>
        <Text style={styles.paragraph}>
          If you are exempt from backup withholding and/or FATCA reporting, enter in the appropriate
          space on line 4 any code(s) that may apply to you.
        </Text>
        <Text style={styles.whatsNewHeader}>Exempt Payee Code</Text>
      </View>
      {/* Paragraphs */}
      <View style={styles.section}>
        <Text style={styles.paragraph}>
          1. Generally, individuals (including sole proprietors) are not exempt from backup
          withholding.
        </Text>
        <Text style={styles.paragraph}>
          2. Except as provided below, corporations are exempt from backup withholding for certain
          payments, including interest and dividends.
        </Text>
        <Text style={styles.paragraph}>
          3. Corporations are not exempt from backup withholding for payments made in settlement of
          payment card or third-party network transactions.
        </Text>
        <Text style={styles.paragraph}>
          4. Corporations are not exempt from backup withholding with respect to attorneys’ fees or
          gross proceeds paid to attorneys, and corporations that provide medical or health care
          services are not exempt with respect to payments reportable on Form 1099-MISC.
        </Text>
      </View>

      {/* List Section */}
      <View style={styles.section}>
        <Text style={styles.paragraph}>
          The following codes identify payees that are exempt from backup withholding. Enter the
          appropriate code in the space on line 4:
        </Text>

        <Text style={styles.listItem}>
          1. An organization exempt from tax under section 501(a), any IRA, or a custodial account
          under section 403(b)(7) if the account satisfies the requirements of section 401(f)(2).
        </Text>
        <Text style={styles.listItem}>
          2. The United States or any of its agencies or instrumentalities.
        </Text>
        <Text style={styles.listItem}>
          3. A state, the District of Columbia, a U.S. commonwealth or territory, or any of their
          political subdivisions or instrumentalities.
        </Text>
        <Text style={styles.listItem}>
          4. A foreign government or any of its political subdivisions, agencies, or
          instrumentalities.
        </Text>
        <Text style={styles.listItem}>5. A corporation.</Text>
        <Text style={styles.listItem}>
          6. A dealer in securities or commodities required to register in the United States, the
          District of Columbia, or a U.S. commonwealth or territory.
        </Text>
        <Text style={styles.listItem}>
          7. A futures commission merchant registered with the Commodity Futures Trading Commission.
        </Text>
        <Text style={styles.listItem}>8. A real estate investment trust.</Text>
        <Text style={styles.listItem}>
          9. An entity registered at all times during the tax year under the Investment Company Act
          of 1940.
        </Text>
        <Text style={styles.listItem}>
          10. A common trust fund operated by a bank under section 584(a).
        </Text>
        <Text style={styles.listItem}>
          11. A financial institution as defined under section 581.
        </Text>
        <Text style={styles.listItem}>
          12. A middleman known in the investment community as a nominee or custodian.
        </Text>
        <Text style={styles.listItem}>
          13. A trust exempt from tax under section 664 or described in section 4947.
        </Text>
      </View>
      <View>
        <Text style={styles.paragraph}>
          The following chart shows types of payments that may be exempt from backup withholding.
          The chart applies to the exempt payees listed above, 1 through 13.
        </Text>
      </View>
      <View style={styles.table}>
        {/* Header Row */}
        <View style={[styles.tableRow]}>
          <Text style={styles.tableHeader}>IF the payment is for . . .</Text>

          <Text style={styles.tableHeader}>THEN the payment is exempt for . . .</Text>
        </View>

        {/* Data Rows */}
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Interest and dividend payments</Text>

          <Text style={styles.tableCell}>All exempt payees except for 7.</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Broker transactions</Text>

          <Text style={styles.tableCell}>
            Exempt payees 1 through 4 and 6 through 11 and all C corporations. S corporations must
            not enter an exempt payee code because they are exempt only for sales of noncovered
            securities acquired prior to 2012.
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Barter exchange transactions and patronage dividends</Text>
          <Text style={styles.tableCell}>Exempt payees 1 through 4.</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>
            Payments over $600 required to be reported and direct sales over $5,000
          </Text>
          <Text style={styles.tableCell}>Generally, exempt payees 1 through 5.</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>
            Payments made in settlement of payment card or third-party network transactions
          </Text>
          <Text style={styles.tableCell}>Exempt payees 1 through 4.</Text>
        </View>
      </View>
      <Text style={styles.whatsNewHeader}>Exemption from FATCA Reporting Code</Text>

      {/* Description */}
      <Text style={styles.paragraph}>
        The following codes identify payees that are exempt from reporting under FATCA. These codes
        apply to persons submitting this form for accounts maintained outside of the United States
        by certain foreign financial institutions. Therefore, if you are only submitting this form
        for an account you hold in the United States, you may leave this field blank. Consult with
        the person requesting this form if you are uncertain if the financial institution is subject
        to these requirements. A requester may indicate that a code is not required by providing you
        with a Form W-9 with "Not Applicable" (or any similar indication) entered on the line for a
        FATCA exemption code.
      </Text>

      {/* List of Exemptions */}
      <View style={styles.list}>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>A:</Text>
          <Text>
            An organization exempt from tax under section 501(a) or any individual retirement plan
            as defined in section 7701(a)(37).
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>B:</Text>
          <Text>The United States or any of its agencies or instrumentalities.</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>C:</Text>
          <Text>
            A state, the District of Columbia, a U.S. commonwealth or territory, or any of their
            political subdivisions or instrumentalities.
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>D:</Text>
          <Text>
            A corporation the stock of which is regularly traded on one or more established
            securities markets, as described in Regulations section 1.1472-1(c)(1)(i).
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>E:</Text>
          <Text>
            A corporation that is a member of the same expanded affiliated group as a corporation
            described in Regulations section 1.1472-1(c)(1)(i).
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>F:</Text>
          <Text>
            A dealer in securities, commodities, or derivative financial instruments (including
            notional principal contracts, futures, forwards, and options) that is registered as such
            under the laws of the United States or any state.
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>G:</Text>
          <Text>A real estate investment trust.</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>H:</Text>
          <Text>
            A regulated investment company as defined in section 851 or an entity registered at all
            times during the tax year under the Investment Company Act of 1940.
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>I:</Text>
          <Text>A common trust fund as defined in section 584(a).</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>J:</Text>
          <Text>A bank as defined in section 581.</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>K:</Text>
          <Text>A broker.</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>L:</Text>
          <Text>A trust exempt from tax under section 664 or described in section 4947(a)(1).</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>M:</Text>
          <Text>A tax-exempt trust under a section 403(b) plan or section 457(g) plan.</Text>
        </View>
      </View>
      <View >
        <Text style={[styles.instructionsHeader ,styles.label]}>Instructions for Completing Form W-9</Text>
        <Text style={styles.instructionsHeader}>Line 5</Text>
        <Text style={styles.listItem}>
          Enter your address (number, street, and apartment or suite number). This is where the
          requester of this Form W-9 will mail your information returns. If this address differs
          from the one the requester already has on file, enter “NEW” at the top. If a new address
          is provided, there is still a chance the old address will be used until the payor changes
          your address in their records.
        </Text>
        <Text style={styles.instructionsHeader}>Line 6</Text>
        <Text style={styles.listItem}>Enter your city, state, and ZIP code.</Text>
        <Text style={styles.listItem}>Part I. Taxpayer Identification Number (TIN)</Text>
        <Text style={styles.paragraph}>
          Enter your TIN in the appropriate box. If you are a resident alien and you do not have,
          and are not eligible to get, an SSN, your TIN is your IRS ITIN. Enter it in the entry
          space for the Social security number. If you do not have an ITIN, see How to get a TIN
          below. If you are a sole proprietor and you have an EIN, you may enter either your SSN or
          EIN. If you are a single-member LLC that is disregarded as an entity separate from its
          owner, enter the owner’s SSN (or EIN, if the owner has one). If the LLC is classified as a
          corporation or partnership, enter the entity’s EIN.
        </Text>
        <Text>
          Note: See What Name and Number To Give the Requester, later, for further clarification of
          name and TIN combinations.
        </Text>
      </View>
      <View>
        <Text style={styles.stitle}>How to Get a TIN </Text>

        <Text style={styles.paragraph}>
          If you do not have a TIN, apply for one immediately. To apply for an SSN, get Form SS-5,
          Application for a Social Security Card, from your local SSA office or get this form online
          at www.SSA.gov. You may also get this form by calling 800-772-1213. Use Form W-7,
          Application for IRS Individual Taxpayer Identification Number, to apply for an ITIN, or
          Form SS-4, Application for Employer Identification Number, to apply for an EIN. You can
          apply for an EIN online by accessing the IRS website at www.irs.gov/EIN. Go to
          www.irs.gov/Forms to view, download, or print Form W-7 and/or Form SS-4. Or, you can go to
          www.irs.gov/OrderForms to place an order and have Form W-7 and/or Form SS-4 mailed to you
          within 15 business days. If you are asked to complete Form W-9 but do not have a TIN,
          apply for a TIN and enter “Applied For” in the space for the TIN, sign and date the form,
          and give it to the requester. For interest and dividend payments, and certain payments
          made with respect to readily tradable instruments, you will generally have 60 days to get
          a TIN and give it to the requester before you are subject to backup withholding on
          payments. The 60-day rule does not apply to other types of payments. You will be subject
          to backup withholding on all such payments until you provide your TIN to the requester.
          Note: Entering “Applied For” means that you have already applied for a TIN or that you
          intend to apply for one soon. See also Establishing U.S. status for purposes of chapter 3
          and chapter 4 withholding, earlier, for when you may instead be subject to withholding
          under chapter 3 or 4 of the Code. Caution: A disregarded U.S. entity that has a foreign
          owner must use the appropriate Form W-8.
        </Text>
        <Text style={styles.label}>
          Caution: A disregarded U.S. entity that has a foreign owner must use the appropriate Form
          W-8.
        </Text>
      </View>
      <View style={styles.section}>
        {/* Header */}
        <Text style={styles.header}>Part II. Certification</Text>

        {/* Description */}
        <Text style={styles.paragraph}>
          To establish to the withholding agent that you are a U.S. person or resident alien, sign
          Form W-9. You may be requested to sign by the withholding agent even if item 1, 4, or 5
          below indicates otherwise. For a joint account, only the person whose TIN is shown in Part
          I should sign (when required). In the case of a disregarded entity, the person identified
          on line 1 must sign. Exempt payees, see{' '}
          <Text style={{ fontStyle: 'italic' }}>Exempt payee code</Text>, earlier.
        </Text>

        {/* Sub-header */}
        <Text style={styles.subHeader}>Signature Requirements</Text>
        <Text style={styles.paragraph}>
          Complete the certification as indicated in items 1 through 5 below:
        </Text>

        {/* List of Items */}
        <View style={styles.list}>
          <View style={styles.listItem}>
            <Text>
              <Text style={styles.listItemHeader}>
                1. Interest, dividend, and barter exchange accounts opened before 1984{' '}
              </Text>
              and broker accounts considered active during 1983. You must give your correct TIN, but
              you do not have to sign the certification.
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text>
              <Text style={styles.listItemHeader}>
                2. Interest, dividend, broker, and barter exchange accounts opened after 1983{' '}
              </Text>
              and broker accounts considered inactive during 1983. You must sign the certification
              or backup withholding will apply. If you are subject to backup withholding and you are
              merely providing your correct TIN to the requester, you must cross out item 2 in the
              certification before signing the form.
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text>
              <Text style={styles.listItemHeader}>3. Real estate transactions. </Text>
              You must sign the certification. You may cross out item 2 of the certification.
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.paragraph}>
              <Text style={styles.listItemHeader}>4. Other payments. </Text>
              You must give your correct TIN, but you do not have to sign the certification unless
              you have been notified that you have previously given an incorrect TIN. “Other
              payments” include payments made in the course of the requester’s trade or business for
              rents, royalties, goods (other than bills for merchandise), medical and health care
              services (including payments to corporations), payments to a nonemployee for services,
              payments made in settlement of payment card and third-party network transactions,
              payments to certain fishing boat crew members and fishermen, and gross proceeds paid
              to attorneys (including payments to corporations).
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text>
              <Text style={styles.listItemHeader}>
                5. Mortgage interest paid by you, acquisition or abandonment of secured property,{' '}
              </Text>
              cancellation of debt, qualified tuition program payments (under section 529), ABLE
              accounts (under section 529A), IRA, Coverdell ESA, Archer MSA or HSA contributions or
              distributions, and pension distributions. You must give your correct TIN, but you do
              not have to sign the certification.
            </Text>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.label}>What Name and Number To Give the Requester</Text>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableRow}>
            <Text style={[styles.tableHeader, styles.firstColumn]}>For this type of account:</Text>
            <Text style={[styles.tableHeader, styles.secondColumn]}>Give name and SSN of:</Text>
          </View>

          {/* Table Rows */}
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.firstColumn]}>1. Individual</Text>
            <Text style={[styles.tableCell, styles.secondColumn]}>The individual</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.firstColumn]}>
              2. Two or more individuals (joint account) other than an account maintained by an FFI
            </Text>
            <Text style={[styles.tableCell, styles.secondColumn]}>
              The actual owner of the account or, if combined funds, the first individual on the
              account*
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.firstColumn]}>
              3. Two or more U.S. persons (joint account maintained by an FFI)
            </Text>
            <Text style={[styles.tableCell, styles.secondColumn]}>Each holder of the account</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.firstColumn]}>
              4. Custodial account of a minor (Uniform Gift to Minors Act)
            </Text>
            <Text style={[styles.tableCell, styles.secondColumn]}>The minor*</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.firstColumn]}>
              5. a. The usual revocable savings trust (grantor is also trustee)
            </Text>
            <Text style={[styles.tableCell, styles.secondColumn]}>The grantor-trustee*</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.firstColumn]}>
              5. b. So-called trust account that is not a legal or valid trust under state law
            </Text>
            <Text style={[styles.tableCell, styles.secondColumn]}>The actual owner*</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.firstColumn]}>
              6. Sole proprietorship or disregarded entity owned by an individual
            </Text>
            <Text style={[styles.tableCell, styles.secondColumn]}>The owner*</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.firstColumn]}>
              7. Grantor trust filing under Optional Filing Method 1 (see Regulations section
              1.671-4(b)(2)(i)(A))
            </Text>
            <Text style={[styles.tableCell, styles.secondColumn]}>The grantor*</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.firstColumn]}>
              8. Disregarded entity not owned by an individual
            </Text>
            <Text style={[styles.tableCell, styles.secondColumn]}>The owner</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.firstColumn]}>
              9. A valid trust, estate, or pension trust
            </Text>
            <Text style={[styles.tableCell, styles.secondColumn]}>Legal entity*</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.firstColumn]}>
              10. Corporation or LLC electing corporate status on Form 8832 or Form 2553
            </Text>
            <Text style={[styles.tableCell, styles.secondColumn]}>The corporation</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.firstColumn]}>
              11. Association, club, religious, charitable, educational, or other tax-exempt
              organization
            </Text>
            <Text style={[styles.tableCell, styles.secondColumn]}>The organization</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.firstColumn]}>
              12. Partnership or multi-member LLC
            </Text>
            <Text style={[styles.tableCell, styles.secondColumn]}>The partnership</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.firstColumn]}>
              13. A broker or registered nominee
            </Text>
            <Text style={[styles.tableCell, styles.secondColumn]}>The broker or nominee</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.firstColumn]}>
              14. Account with the Department of Agriculture in the name of a public entity (such as
              a state or local government, school district, or prison) that receives agricultural
              program payments
            </Text>
            <Text style={[styles.tableCell, styles.secondColumn]}>The public entity</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.firstColumn]}>
              15. Grantor trust filing Form 1041 or under the Optional Filing Method 2, requiring
              Form 1099 (see Regulations section 1.671-4(b)(2)(i)(B))**
            </Text>
            <Text style={[styles.tableCell, styles.secondColumn]}>The trust</Text>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.instructionsHeader}>Secure Your Tax Records From Identity Theft</Text>
        <Text>
          Identity theft occurs when someone uses your personal information, such as your name, SSN,
          or other identifying information, without your permission to commit fraud or other crimes.
          An identity thief may use your SSN to get a job or may file a tax return using your SSN to
          receive a refund.
        </Text>
        <Text style={styles.listItemHeader}>1.Protect your SSN</Text>
        <Text style={styles.listItemHeader}>2.Ensure your employer is protecting your SSN</Text>
        <Text style={styles.listItemHeader}>3.Be careful when choosing a tax return preparer</Text>
        <Text>
          If your tax records are affected by identity theft and you receive a notice from the IRS,
          respond right away to the name and phone number printed on the IRS notice or letter
        </Text>
        <Text>
          If your tax records are not currently affected by identity theft but you think you are at
          risk due to a lost or stolen purse or wallet, questionable credit card activity, or a
          questionable credit report, contact the IRS Identity Theft Hotline at 800-908-4490 or
          submit Form 14039.
        </Text>
        <Text>For more information, see Pub. 5027, Identity Theft Information for Taxpayers.</Text>
        <Text>
          Victims of identity theft who are experiencing economic harm or a systemic problem, or are
          seeking help in resolving tax problems that have not been resolved through normal
          channels, may be eligible for Taxpayer Advocate Service (TAS) assistance. You can reach
          TAS by calling the TAS toll-free case intake line at 877-777-4778or TTY/TDD 800-829-4059.
        </Text>
      </View>
      <View style={styles.paragraph}>
        <View style={styles.section}>
          <Text style={styles.stitle}>
            Protect yourself from suspicious emails or phishing schemes.
          </Text>
          <Text style={styles.paragraph}>
            Phishing is the creation and use of email and websites designed to mimic legitimate
            business emails and websites. The most common act is sending an email to a user falsely
            claiming to be an established legitimate enterprise in an attempt to scam the user into
            surrendering private information that will be used for identity theft.
          </Text>
          <Text style={styles.paragraph}>
            The IRS does not initiate contacts with taxpayers via emails. Also, the IRS does not
            request personal detailed information through email or ask taxpayers for PIN numbers,
            passwords, or similar secret access information for their credit card, bank, or other
            financial accounts.
          </Text>
          <Text style={styles.paragraph}>
            If you receive an unsolicited email claiming to be from the IRS, forward this message to{' '}
            phishing@irs.gov. You may also report misuse of the IRS name, logo, or other IRS
            property to the Treasury Inspector General for Tax Administration (TIGTA) at
            800-366-4484. You can forward suspicious emails to the Federal Trade Commission at
            spam@uce.gov or report them at www.ftc.gov/complaint. You can contact the FTC at
            www.ftc.gov/idtheftor 877-IDTHEFT (877-438-4338).
          </Text>
          <Text style={styles.paragraph}>
            If you have been the victim of identity theft, see www.IdentityTheft.gov and Pub. 5027.
          </Text>
          <Text style={styles.paragraph}>
            Go to www.irs.gov/IdentityTheftto learn more about identity theft and how to reduce your
            risk.
          </Text>
          <Text style={styles.instructionsHeader}>Privacy Act Notice</Text>
          <Text style={styles.paragraph}>
            Section 6109 of the Internal Revenue Code requires you to provide your correct TIN to
            persons (including federal agencies) who are required to file information returns with
            the IRS to report interest, dividends, or certain other income paid to you; mortgage
            interest you paid; the acquisition or abandonment of secured property; the cancellation
            of debt; or contributions you made to an IRA, Archer MSA, or HSA. The person collecting
            this form uses the information on the form to file information returns with the IRS,
            reporting the above information.
          </Text>
          <Text style={styles.paragraph}>
            Routine uses of this information include giving it to the Department of Justice for
            civil and criminal litigation and to cities, states, the District of Columbia, and U.S.
            commonwealths and territories for use in administering their laws. The information may
            also be disclosed to other countries under a treaty, to federal and state agencies to
            enforce civil and criminal laws, or to federal law enforcement and intelligence agencies
            to combat terrorism. You must provide your TIN whether or not you are required to file a
            tax return. Under section 3406, payors must generally withhold a percentage of taxable
            interest, dividends, and certain other payments to a payee who does not give a TIN to
            the payor. Certain penalties may also apply for providing false or fraudulent
            information.
          </Text>
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>Form W-9 (Rev. March 2024)</Text>
    </Page>
  </Document>
)

export default FormPdf
