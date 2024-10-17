import React from 'react';
import {
    CRow, CCol, CCard,
    CCardBody,
    CCardHeader,
    CTableBody,
    CTable,
    CTableHead,
    CTableHeaderCell,
    CTableDataCell,
    CTableRow
} from '@coreui/react';

const GeneralInstruction = () => {
    return (
        <CRow className="mb-3">
            <CCol md="12">
                <h4>General Instructions</h4>
                <p>
                    Section references are to the Internal Revenue Code unless otherwise noted.
                </p>
                <p className="mt-2 fw-bold">Future developments.</p>
                <p>
                    For the latest information about developments related to Form W-9 and its instructions, such as legislation enacted after they were published, go to{" "}
                    <a href="https://www.irs.gov/FormW9">www.irs.gov/FormW9</a>.
                </p>
            </CCol>

            <CCol md="12" className="mt-4">
                <h4>What's New</h4>
                <p>
                    Line 3a has been modified to clarify how a disregarded entity completes this line. An LLC that is a disregarded entity should check the appropriate box for the tax classification of its owner. Otherwise, it should check the “LLC” box and enter its appropriate tax classification.
                </p>
                <p>
                    New line 3b has been added to this form. A flow-through entity is
                    required to complete this line to indicate that it has direct or indirect
                    foreign partners, owners, or beneficiaries when it provides the Form W-9
                    to another flow-through entity in which it has an ownership interest. This
                    change is intended to provide a flow-through entity with information
                    regarding the status of its indirect foreign partners, owners, or
                    beneficiaries, so that it can satisfy any applicable reporting
                    requirements. For example, a partnership that has any indirect foreign
                    partners may be required to complete Schedules K-2 and K-3. See the
                    Partnership Instructions for Schedules K-2 and K-3 (Form 1065).
                </p>
            </CCol>


            <CCol md="12" className="mt-4">
                <h4>Purpose of Form</h4>

                <p>
                    An individual or entity (Form W-9 requester) who is required to file an
                    information return with the IRS is giving you this form because theymust obtain your correct taxpayer identification number (TIN), which
                    may be your social security number (SSN), individual taxpayer
                    identification number (ITIN), adoption taxpayer identification number
                    (ATIN), or employer identification number (EIN), to report on an
                    information return the amount paid to you, or other amount reportable
                    on an information return. Examples of information returns include, but
                    are not limited to, the following.


                </p>
                <ul>
                    <li>Form 1099-INT (interest earned or paid).</li>
                    <li>Form 1099-DIV (dividends, including those from stocks or mutual funds).</li>
                    <li>Form 1099-MISC (various types of income, prizes, awards, or gross proceeds).</li>
                    <li>Form 1099-NEC (nonemployee compensation).</li>
                    <li>Form 1099-B (stock or mutual fund sales and certain other transactions by brokers).</li>
                    <li>Form 1099-S (proceeds from real estate transactions).</li>
                    <li>Form 1099-K (merchant card and third-party network transactions).</li>
                    <li>Form 1098 (home mortgage interest), 1098-E (student loan interest), and 1098-T (tuition).</li>
                    <li>Form 1099-C (canceled debt).</li>
                    <li>Form 1099-A (acquisition or abandonment of secured property).</li>
                </ul>


                <p className="mt-2 fw-bold">Caution :</p>
                <p>
                    If you don’t return Form W-9 to the requester with a TIN, you
                    might be subject to backup withholding. See What is backup
                    withholding, later.
                </p>
                <p className="mt-2 fw-bold">
                    By signing the filled-out form,
                </p>

                <ol>
                    <li>Certify that the TIN you are giving is correct (or you are waiting for a number to be issued);</li>
                    <li>Certify that you are not subject to backup withholding; or</li>
                    <li>Claim exemption from backup withholding if you are a U.S. exempt payee; and</li>
                    <li>Certify to your non-foreign status for purposes of withholding under chapter 3 or 4 of the Code (if applicable); and</li>
                    <li>Certify that FATCA code(s) entered on this form (if any) indicating that you are exempt from the FATCA reporting is correct. See What Is FATCA Reporting, later, for further information.</li>
                </ol>
                <p>
                    <strong>Note:</strong> If you are a U.S. person and a requester gives you a form other than Form W-9 to request your TIN, you must use the requester’s form if it is substantially similar to this Form W-9.
                </p>
                <div>
                    <p><strong>Definition of a U.S. person.</strong> For federal tax purposes, you are considered a U.S. person if you are:</p>
                    <ul>
                        <li>An individual who is a U.S. citizen or U.S. resident alien;</li>
                        <li>A partnership, corporation, company, or association created or organized in the United States or under the laws of the United States;</li>
                        <li>An estate (other than a foreign estate); or</li>
                        <li>A domestic trust (as defined in Regulations section 301.7701-7).</li>
                    </ul>

                    <p><strong>Establishing U.S. status for purposes of chapter 3 and chapter 4 withholding.</strong> Payments made to foreign persons, including certain distributions, allocations of income, or transfers of sales proceeds, may be subject to withholding under chapter 3 or chapter 4 of the Code (sections 1441–1474). Under those rules, if a Form W-9 or other certification of non-foreign status has not been received, a withholding agent, transferee, or partnership (payor) generally applies presumption rules that may require the payor to withhold applicable tax from the recipient, owner, transferor, or partner (payee). See Pub. 515, Withholding of Tax on Nonresident Aliens and Foreign Entities.</p>

                    <p>The following persons must provide Form W-9 to the payor for purposes of establishing their non-foreign status:</p>
                    <ul>
                        <li>In the case of a disregarded entity with a U.S. owner, the U.S. owner of the disregarded entity and not the disregarded entity.</li>
                        <li>In the case of a grantor trust with a U.S. grantor or other U.S. owner, generally, the U.S. grantor or other U.S. owner of the grantor trust and not the grantor trust.</li>
                        <li>In the case of a U.S. trust (other than a grantor trust), the U.S. trust and not the beneficiaries of the trust.</li>
                    </ul>

                    <p>See Pub. 515 for more information on providing a Form W-9 or a certification of non-foreign status to avoid withholding.</p>
                </div>



            </CCol>


            <CCol md="12" className="mt-4">
                <h4>Foreign person.</h4>

                <p>
                    If you are a foreign person or the U.S. branch of a
                    foreign bank that has elected to be treated as a U.S. person (under
                    Regulations section 1.1441-1(b)(2)(iv) or other applicable section for
                    chapter 3 or 4 purposes), do not use Form W-9. Instead, use the
                    appropriate Form W-8 or Form 8233 (see Pub. 515). If you are a
                    qualified foreign pension fund under Regulations section 1.897(l)-1(d), or
                    a partnership that is wholly owned by qualified foreign pension funds,
                    that is treated as a non-foreign person for purposes of section 1445
                    withholding, do not use Form W-9. Instead, use Form W-8EXP (or other
                    certification of non-foreign status).

                </p>


            </CCol>

            <CCol md="12" className="mt-4">
                <h4>Nonresident alien who becomes a resident alien.</h4>

                <p>
                    Generally, only a
                    nonresident alien individual may use the terms of a tax treaty to reduce
                    or eliminate U.S. tax on certain types of income. However, most tax
                    treaties contain a provision known as a saving clause. Exceptions
                    specified in the saving clause may permit an exemption from tax to
                    continue for certain types of income even after the payee has otherwise
                    become a U.S. resident alien for tax purposes.

                </p>

                <div>
                    <p>
                        If you are a U.S. resident alien who is relying on an exception contained in the saving clause of a tax treaty to claim an exemption from U.S. tax on certain types of income, you must attach a statement to Form W-9 that specifies the following five items:
                    </p>
                    <ol>
                        <li>The treaty country. Generally, this must be the same treaty under which you claimed exemption from tax as a nonresident alien.</li>
                        <li>The treaty article addressing the income.</li>
                        <li>The article number (or location) in the tax treaty that contains the saving clause and its exceptions.</li>
                        <li>The type and amount of income that qualifies for the exemption from tax.</li>
                        <li>Sufficient facts to justify the exemption from tax under the terms of the treaty article.</li>
                    </ol>

                    <p>
                        <strong>Example:</strong> Article 20 of the U.S.-China income tax treaty allows an exemption from tax for scholarship income received by a Chinese student temporarily present in the United States. Under U.S. law, this student will become a resident alien for tax purposes if their stay in the United States exceeds 5 calendar years. However, paragraph 2 of the first Protocol to the U.S.-China treaty (dated April 30, 1984) allows the provisions of Article 20 to continue to apply even after the Chinese student becomes a resident alien of the United States. A Chinese student who qualifies for this exception (under paragraph 2 of the first Protocol) and is relying on this exception to claim an exemption from tax on their scholarship or fellowship income would attach to Form W-9 a statement that includes the information described above to support that exemption.
                    </p>

                    <p>
                        If you are a nonresident alien or a foreign entity, give the requester the appropriate completed Form W-8 or Form 8233.
                    </p>
                </div>

                <div>
                    <h4>Backup Withholding</h4>
                    <p>
                        <span className="mt-2 fw-bold">What is backup withholding? </span>Persons making certain payments to you
                        must under certain conditions withhold and pay to the IRS 24% of such
                        payments. This is called “backup withholding.” Payments that may be
                        subject to backup withholding include, but are not limited to, interest,
                        tax-exempt interest, dividends, broker and barter exchange
                        transactions, rents, royalties, nonemployee pay, payments made in
                        settlement of payment card and third-party network transactions, and
                        certain payments from fishing boat operators. Real estate transactions
                        are not subject to backup withholding.
                    </p>
                    <p>
                        You will not be subject to backup withholding on payments you receive
                        if you give the requester your correct TIN, make the proper certifications,
                        and report all your taxable interest and dividends on your tax return.
                    </p>
                </div>

                <div>
                    <p>Payments you receive will be subject to backup withholding if:</p>
                    <ol>
                        <li>You do not furnish your TIN to the requester;</li>
                        <li>You do not certify your TIN when required (see the instructions for Part II for details);</li>
                        <li>The IRS tells the requester that you furnished an incorrect TIN;</li>
                        <li>The IRS tells you that you are subject to backup withholding because you did not report all your interest and dividends on your tax return (for reportable interest and dividends only); or</li>
                        <li>You do not certify to the requester that you are not subject to backup withholding, as described in item 4 under “By signing the filled-out form” above (for reportable interest and dividend accounts opened after 1983 only).</li>
                    </ol>
                </div>

                <div>
                    Certain payees and payments are exempt from backup withholding.
                    See Exempt payee code, later, and the separate Instructions for the
                    Requester of Form W-9 for more information.
                    See also Establishing U.S. status for purposes of chapter 3 and
                    chapter 4 withholding, earlier.
                </div>

                <div className='xyz' style={{ marginTop: "20px" }}>
                    <h4>What Is FATCA Reporting?</h4>
                    <p>
                        The Foreign Account Tax Compliance Act (FATCA) requires a participating foreign financial institution to report all U.S. account holders that are specified U.S. persons. Certain payees are exempt from FATCA reporting. See Exemption from FATCA reporting code, later, and the Instructions for the Requester of Form W-9 for more information.
                    </p>

                    <h4>Updating Your Information</h4>
                    <p>
                        You must provide updated information to any person to whom you claimed to be an exempt payee if you are no longer an exempt payee and anticipate receiving reportable payments in the future from this person.
                    </p>
                    <ul>
                        <li>
                            For example, you may need to provide updated information if you are a C corporation that elects to be an S corporation, or if you are no longer tax exempt.
                        </li>
                        <li>
                            In addition, you must furnish a new Form W-9 if the name or TIN changes for the account, for example, if the grantor of a grantor trust dies.
                        </li>
                    </ul>

                    <h4>Penalties</h4>
                    <ul>
                        <li>
                            <strong>Failure to furnish TIN:</strong> If you fail to furnish your correct TIN to a requester, you are subject to a penalty of $50 for each such failure unless your failure is due to reasonable cause and not to willful neglect.
                        </li>
                        <li>
                            <strong>Civil penalty for false information with respect to withholding:</strong> If you make a false statement with no reasonable basis that results in no backup withholding, you are subject to a $500 penalty.
                        </li>
                        <li>
                            <strong>Criminal penalty for falsifying information:</strong> Willfully falsifying certifications or affirmations may subject you to criminal penalties including fines and/or imprisonment.
                        </li>
                        <li>
                            <strong>Misuse of TINs:</strong> If the requester discloses or uses TINs in violation of federal law, the requester may be subject to civil and criminal penalties.
                        </li>
                    </ul>

                    <h4>Specific Instructions</h4>
                    <h4>Line 1</h4>
                    <p>
                        You must enter one of the following on this line; do not leave this line blank. The name should match the name on your tax return.
                    </p>
                    <ul>
                        <li>
                            <strong>Individual:</strong> Enter the name shown on your tax return. If you have changed your last name without informing the Social Security Administration (SSA) of the name change, enter your first name, the last name as shown on your social security card, and your new last name. Note for ITIN applicant: Enter your individual name as it was entered on your Form W-7 application, line 1a.
                        </li>
                        <li>
                            <strong>Sole proprietor:</strong> Enter your individual name as shown on your Form 1040 on line 1. Enter your business, trade, or “doing business as” (DBA) name on line 2.
                        </li>
                        <li>
                            <strong>Partnership, C corporation, S corporation, or LLC:</strong> Enter the entity’s name as shown on the entity’s tax return on line 1 and any business, trade, or DBA name on line 2.
                        </li>
                        <li>
                            <strong>Other entities:</strong> Enter your name as shown on required U.S. federal tax documents on line 1. This name should match the name shown on the charter or other legal document creating the entity. Enter any business, trade, or DBA name on line 2.
                        </li>
                        <li>
                            <strong>Disregarded entity:</strong> Enter the owner’s name on line 1. The name on line 1 should be the name shown on the income tax return on which the income should be reported.
                        </li>
                    </ul>
                </div>


                <div>
                    <h4>
                        Line 2
                    </h4>

                    <p>
                        If you have a business name, trade name, DBA name, or disregarded
                        entity name, enter it on line 2.
                    </p>
                </div>

                <div>
                    <h4>
                        Line 3a
                    </h4>

                    <p>
                        Check the appropriate box on line 3a for the U.S. federal tax
                        classification of the person whose name is entered on line 1. Check only
                        one box on line 3a.
                    </p>
                    <CCard>
                        <CCardHeader>
                            <h5>Entity Classification Table</h5>
                        </CCardHeader>
                        <CCardBody>
                            <CTable striped>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell>IF the entity/individual on line 1 is a(n)</CTableHeaderCell>
                                        <CTableHeaderCell>THEN check the box for . . .</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    <CTableRow>
                                        <CTableDataCell>Corporation</CTableDataCell>
                                        <CTableDataCell>Corporation.</CTableDataCell>
                                    </CTableRow>
                                    <CTableRow>
                                        <CTableDataCell>Individual or Sole proprietorship</CTableDataCell>
                                        <CTableDataCell>Individual/sole proprietor.</CTableDataCell>
                                    </CTableRow>
                                    <CTableRow>
                                        <CTableDataCell>LLC classified as a partnership for U.S. federal tax purposes</CTableDataCell>
                                        <CTableDataCell>
                                            Limited liability company and enter the appropriate tax classification:
                                            <ul>
                                                <li>P = Partnership</li>
                                                <li>C = C corporation</li>
                                                <li>S = S corporation</li>
                                            </ul>
                                        </CTableDataCell>
                                    </CTableRow>
                                    <CTableRow>
                                        <CTableDataCell>Partnership</CTableDataCell>
                                        <CTableDataCell>Partnership.</CTableDataCell>
                                    </CTableRow>
                                    <CTableRow>
                                        <CTableDataCell>Trust/estate</CTableDataCell>
                                        <CTableDataCell>Trust/estate.</CTableDataCell>
                                    </CTableRow>
                                </CTableBody>
                            </CTable>
                        </CCardBody>
                    </CCard>
                </div>


                <div className='3b' style={{ marginTop: '10px' }}>
                    <h4>
                        Line 3b
                    </h4>

                    <p>
                        Check this box if you are a partnership (including an LLC classified as a
                        partnership for U.S. federal tax purposes), trust, or estate that has any
                        foreign partners, owners, or beneficiaries, and you are providing this
                        form to a partnership, trust, or estate, in which you have an ownership
                        interest. You must check the box on line 3b if you receive a Form W-8
                        (or documentary evidence) from any partner, owner, or beneficiary
                        establishing foreign status or if you receive a Form W-9 from any
                        partner, owner, or beneficiary that has checked the box on line 3b.
                    </p>

                    <p>
                        <span className="mt-2 fw-bold"> Note: </span>A partnership that provides a Form W-9 and checks box 3b may
                        be required to complete Schedules K-2 and K-3 (Form 1065). For more
                        information, see the Partnership Instructions for Schedules K-2 and K-3
                        (Form 1065).
                    </p>

                    <p>
                        If you are required to complete line 3b but fail to do so, you may not
                        receive the information necessary to file a correct information return with
                        the IRS or furnish a correct payee statement to your partners or
                        beneficiaries. See, for example, sections 6698, 6722, and 6724 for
                        penalties that may apply.
                    </p>
                </div>

                <div>
                    <h4>
                        Line 4 Exemptions

                    </h4>
                    <p>
                        If you are exempt from backup withholding and/or FATCA reporting,
                        enter in the appropriate space on line 4 any code(s) that may apply to
                        you.
                    </p>

                    <p>
                        <strong>Exempt payee code.</strong>
                    </p>

                    <ol>
                        <li>Generally, individuals (including sole proprietors) are not exempt from
                            backup withholding.</li>
                        <li>Except as provided below, corporations are exempt from backup
                            withholding for certain payments, including interest and dividends.</li>
                        <li>Corporations are not exempt from backup withholding for payments
                            made in settlement of payment card or third-party network transactions.</li>
                        <li>Corporations are not exempt from backup withholding with respect to
                            attorneys’ fees or gross proceeds paid to attorneys, and corporations
                            that provide medical or health care services are not exempt with respect
                            to payments reportable on Form 1099-MISC.</li>

                    </ol>

                    <p>The following codes identify payees that are exempt from backup
                        withholding. Enter the appropriate code in the space on line 4.
                    </p>

                    <ol>
                        <li>An organization exempt from tax under section 501(a), any IRA, or
                            a custodial account under section 403(b)(7) if the account satisfies the
                            requirements of section 401(f)(2).</li>
                        <li>The United States or any of its agencies or instrumentalities.</li>
                        <li>A state, the District of Columbia, a U.S. commonwealth or territory,
                            or any of their political subdivisions or instrumentalities.</li>
                        <li>A foreign government or any of its political subdivisions, agencies,
                            or instrumentalities.</li>
                        <li>A corporation.</li>
                        <li>A dealer in securities or commodities required to register in the
                            United States, the District of Columbia, or a U.S. commonwealth or
                            territory</li>
                        <li>A futures commission merchant registered with the Commodity
                            Futures Trading Commission.</li>
                        <li>A real estate investment trust</li>
                        <li>An entity registered at all times during the tax year under the
                            Investment Company Act of 1940.</li>
                        <li>A common trust fund operated by a bank under section 584(a).</li>
                        <li>A financial institution as defined under section 581.</li>
                        <li>A middleman known in the investment community as a nominee or
                            custodian.</li>
                        <li>A trust exempt from tax under section 664 or described in section
                            4947.</li>
                    </ol>

                    <p>
                        The following chart shows types of payments that may be exempt
                        from backup withholding. The chart applies to the exempt payees listed
                        above, 1 through 13.
                    </p>

                    <CCard>
                        <CCardBody>
                            <CTable striped>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell>IF the payment is for . . .</CTableHeaderCell>
                                        <CTableHeaderCell>THEN the payment is exempt
                                            for . . .</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    <CTableRow>
                                        <CTableDataCell>Interest and dividend payments</CTableDataCell>
                                        <CTableDataCell>All exempt payees except
                                            for 7.</CTableDataCell>
                                    </CTableRow>
                                    <CTableRow>
                                        <CTableDataCell>Broker transactions</CTableDataCell>
                                        <CTableDataCell>Exempt payees 1 through 4 and 6
                                            through 11 and all C corporations.
                                            S corporations must not enter an
                                            exempt payee code because they
                                            are exempt only for sales of
                                            noncovered securities acquired
                                            prior to 2012.</CTableDataCell>
                                    </CTableRow>
                                    <CTableRow>
                                        <CTableDataCell>Barter exchange transactions
                                            and patronage dividends</CTableDataCell>
                                        <CTableDataCell>
                                            Exempt payees 1 through 4.

                                        </CTableDataCell>
                                    </CTableRow>
                                    <CTableRow>
                                        <CTableDataCell>• Payments over $600 required to
                                            be reported and direct sales over
                                            $5,000</CTableDataCell>
                                        <CTableDataCell>Generally, exempt payees
                                            1 through 5.</CTableDataCell>
                                    </CTableRow>
                                    <CTableRow>
                                        <CTableDataCell>Payments made in settlement of
                                            payment card or third-party
                                            network transactions</CTableDataCell>
                                        <CTableDataCell>Exempt payees 1 through 4.</CTableDataCell>
                                    </CTableRow>
                                </CTableBody>
                            </CTable>
                        </CCardBody>
                    </CCard>


                </div>

                <div>
                    <h3>Exemption from FATCA Reporting Code</h3>
                    <p>
                        The following codes identify payees that are exempt from reporting under FATCA. These codes apply to persons submitting this form for accounts maintained outside of the United States by certain foreign financial institutions. Therefore, if you are only submitting this form for an account you hold in the United States, you may leave this field blank. Consult with the person requesting this form if you are uncertain if the financial institution is subject to these requirements. A requester may indicate that a code is not required by providing you with a Form W-9 with “Not Applicable” (or any similar indication) entered on the line for a FATCA exemption code.
                    </p>

                    <ul>
                        <li><strong>A:</strong> An organization exempt from tax under section 501(a) or any individual retirement plan as defined in section 7701(a)(37).</li>
                        <li><strong>B:</strong> The United States or any of its agencies or instrumentalities.</li>
                        <li><strong>C:</strong> A state, the District of Columbia, a U.S. commonwealth or territory, or any of their political subdivisions or instrumentalities.</li>
                        <li><strong>D:</strong> A corporation the stock of which is regularly traded on one or more established securities markets, as described in Regulations section 1.1472-1(c)(1)(i).</li>
                        <li><strong>E:</strong> A corporation that is a member of the same expanded affiliated group as a corporation described in Regulations section 1.1472-1(c)(1)(i).</li>
                        <li><strong>F:</strong> A dealer in securities, commodities, or derivative financial instruments (including notional principal contracts, futures, forwards, and options) that is registered as such under the laws of the United States or any state.</li>
                        <li><strong>G:</strong> A real estate investment trust.</li>
                        <li><strong>H:</strong> A regulated investment company as defined in section 851 or an entity registered at all times during the tax year under the Investment Company Act of 1940.</li>
                        <li><strong>I:</strong> A common trust fund as defined in section 584(a).</li>
                        <li><strong>J:</strong> A bank as defined in section 581.</li>
                        <li><strong>K:</strong> A broker.</li>
                        <li><strong>L:</strong> A trust exempt from tax under section 664 or described in section 4947(a)(1).</li>
                        <li><strong>M:</strong> A tax-exempt trust under a section 403(b) plan or section 457(g) plan.</li>
                    </ul>

                    <p>
                        Note: You may wish to consult with the financial institution requesting this form to determine whether the FATCA code and/or exempt payee code should be completed.
                    </p>
                </div>

                <div>
                    <h3>Instructions for Completing Form W-9</h3>

                    <h4>Line 5</h4>
                    <p>
                        Enter your address (number, street, and apartment or suite number). This is where the requester of this Form W-9 will mail your information returns. If this address differs from the one the requester already has on file, enter “NEW” at the top. If a new address is provided, there is still a chance the old address will be used until the payor changes your address in their records.
                    </p>

                    <h4>Line 6</h4>
                    <p>
                        Enter your city, state, and ZIP code.
                    </p>

                    <h4>Part I. Taxpayer Identification Number (TIN)</h4>
                    <p>
                        Enter your TIN in the appropriate box. If you are a resident alien and you do not have, and are not eligible to get, an SSN, your TIN is your IRS ITIN. Enter it in the entry space for the Social security number. If you do not have an ITIN, see <strong>How to get a TIN</strong> below.
                    </p>
                    <p>
                        If you are a sole proprietor and you have an EIN, you may enter either your SSN or EIN. If you are a single-member LLC that is disregarded as an entity separate from its owner, enter the owner’s SSN (or EIN, if the owner has one). If the LLC is classified as a corporation or partnership, enter the entity’s EIN.
                    </p>
                    <p>
                        Note: See <strong>What Name and Number To Give the Requester</strong>, later, for further clarification of name and TIN combinations.
                    </p>

                    <h4>How to Get a TIN</h4>
                    <p>
                        If you do not have a TIN, apply for one immediately. To apply for an SSN, get Form SS-5, Application for a Social Security Card, from your local SSA office or get this form online at <a href="http://www.SSA.gov" target="_blank" rel="noopener noreferrer">www.SSA.gov</a>. You may also get this form by calling 800-772-1213. Use Form W-7, Application for IRS Individual Taxpayer Identification Number, to apply for an ITIN, or Form SS-4, Application for Employer Identification Number, to apply for an EIN. You can apply for an EIN online by accessing the IRS website at <a href="http://www.irs.gov/EIN" target="_blank" rel="noopener noreferrer">www.irs.gov/EIN</a>. Go to <a href="http://www.irs.gov/Forms" target="_blank" rel="noopener noreferrer">www.irs.gov/Forms</a> to view, download, or print Form W-7 and/or Form SS-4. Or, you can go to <a href="http://www.irs.gov/OrderForms" target="_blank" rel="noopener noreferrer">www.irs.gov/OrderForms</a> to place an order and have Form W-7 and/or Form SS-4 mailed to you within 15 business days.
                    </p>
                    <p>
                        If you are asked to complete Form W-9 but do not have a TIN, apply for a TIN and enter “Applied For” in the space for the TIN, sign and date the form, and give it to the requester. For interest and dividend payments, and certain payments made with respect to readily tradable instruments, you will generally have 60 days to get a TIN and give it to the requester before you are subject to backup withholding on payments. The 60-day rule does not apply to other types of payments. You will be subject to backup withholding on all such payments until you provide your TIN to the requester.
                    </p>
                    <p>
                        Note: Entering “Applied For” means that you have already applied for a TIN or that you intend to apply for one soon. See also <strong>Establishing U.S. status for purposes of chapter 3 and chapter 4 withholding</strong>, earlier, for when you may instead be subject to withholding under chapter 3 or 4 of the Code.
                    </p>

                    <p>
                        <strong>Caution:</strong> A disregarded U.S. entity that has a foreign owner must use the appropriate Form W-8.
                    </p>
                </div>



            </CCol>
        </CRow>
    );
};

export default GeneralInstruction;
