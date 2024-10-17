import React from 'react';

const FormW9Certification = () => {
  return (

    <>
    <div>
      <h3>Part II. Certification</h3>
      <p>
        To establish to the withholding agent that you are a U.S. person or resident alien, sign Form W-9. You may be requested to sign by the withholding agent even if item 1, 4, or 5 below indicates otherwise. For a joint account, only the person whose TIN is shown in Part I should sign (when required). In the case of a disregarded entity, the person identified on line 1 must sign. Exempt payees, see <strong>Exempt payee code</strong>, earlier.
      </p>

      <h4>Signature Requirements</h4>
      <p>Complete the certification as indicated in items 1 through 5 below:</p>
      <ol>
        <li>
          <strong>Interest, dividend, and barter exchange accounts opened before 1984</strong> and broker accounts considered active during 1983. You must give your correct TIN, but you do not have to sign the certification.
        </li>
        <li>
          <strong>Interest, dividend, broker, and barter exchange accounts opened after 1983</strong> and broker accounts considered inactive during 1983. You must sign the certification or backup withholding will apply. If you are subject to backup withholding and you are merely providing your correct TIN to the requester, you must cross out item 2 in the certification before signing the form.
        </li>
        <li>
          <strong>Real estate transactions.</strong> You must sign the certification. You may cross out item 2 of the certification.
        </li>
        <li>
          <strong>Other payments.</strong> You must give your correct TIN, but you do not have to sign the certification unless you have been notified that you have previously given an incorrect TIN. “Other payments” include payments made in the course of the requester’s trade or business for rents, royalties, goods (other than bills for merchandise), medical and health care services (including payments to corporations), payments to a nonemployee for services, payments made in settlement of payment card and third-party network transactions, payments to certain fishing boat crew members and fishermen, and gross proceeds paid to attorneys (including payments to corporations).
        </li>
        <li>
          <strong>Mortgage interest paid by you, acquisition or abandonment of secured property, cancellation of debt, qualified tuition program payments</strong> (under section 529), ABLE accounts (under section 529A), IRA, Coverdell ESA, Archer MSA or HSA contributions or distributions, and pension distributions. You must give your correct TIN, but you do not have to sign the certification.
        </li>
      </ol>

      {/* Table Section */}
      <h4>What Name and Number To Give the Requester</h4>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>For this type of account:</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Give name and SSN of:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid black', padding: '8px' }}>1. Individual</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>The individual</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '8px' }}>2. Two or more individuals (joint account) other than an account maintained by an FFI</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>The actual owner of the account or, if combined funds, the first individual on the account*</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '8px' }}>3. Two or more U.S. persons (joint account maintained by an FFI)</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>Each holder of the account</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '8px' }}>4. Custodial account of a minor (Uniform Gift to Minors Act)</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>The minor*</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '8px' }}>5. a. The usual revocable savings trust (grantor is also trustee)</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>The grantor-trustee*</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '8px' }}>5. b. So-called trust account that is not a legal or valid trust under state law</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>The actual owner*</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '8px' }}>6. Sole proprietorship or disregarded entity owned by an individual</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>The owner*</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '8px' }}>7. Grantor trust filing under Optional Filing Method 1 (see Regulations section 1.671-4(b)(2)(i)(A))</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>The grantor*</td>
          </tr>
          {/* New Entries Added Below */}
          <tr>
            <td style={{ border: '1px solid black', padding: '8px' }}>8. Disregarded entity not owned by an individual</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>The owner</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '8px' }}>9. A valid trust, estate, or pension trust</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>Legal entity*</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '8px' }}>10. Corporation or LLC electing corporate status on Form 8832 or Form 2553</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>The corporation</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '8px' }}>11. Association, club, religious, charitable, educational, or other tax-exempt organization</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>The organization</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '8px' }}>12. Partnership or multi-member LLC</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>The partnership</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '8px' }}>13. A broker or registered nominee</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>The broker or nominee</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '8px' }}>14. Account with the Department of Agriculture in the name of a public entity (such as a state or local government, school district, or prison) that receives agricultural program payments</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>The public entity</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '8px' }}>15. Grantor trust filing Form 1041 or under the Optional Filing Method 2, requiring Form 1099 (see Regulations section 1.671-4(b)(2)(i)(B))**</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>The trust</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="identity-theft-info">
            <h2>Secure Your Tax Records From Identity Theft</h2>
            <p>
                Identity theft occurs when someone uses your personal information,
                such as your name, SSN, or other identifying information, without your
                permission to commit fraud or other crimes. An identity thief may use
                your SSN to get a job or may file a tax return using your SSN to receive
                a refund.
            </p>
            <h3>To reduce your risk:</h3>
            <ul>
                <li>Protect your SSN</li>
                <li>Ensure your employer is protecting your SSN</li>
                <li>Be careful when choosing a tax return preparer</li>
            </ul>
            <p>
                If your tax records are affected by identity theft and you receive a
                notice from the IRS, respond right away to the name and phone number
                printed on the IRS notice or letter.
            </p>
            <p>
                If your tax records are not currently affected by identity theft but you
                think you are at risk due to a lost or stolen purse or wallet, questionable
                credit card activity, or a questionable credit report, contact the IRS
                Identity Theft Hotline at <strong>800-908-4490</strong> or submit
                <a href="https://www.irs.gov/pub/irs-pdf/f14039.pdf"> Form 14039</a>.
            </p>
            <p>
                For more information, see <a href="https://www.irs.gov/pub/irs-pdf/p5027.pdf">Pub. 5027, Identity Theft Information for Taxpayers</a>.
            </p>
            <p>
                Victims of identity theft who are experiencing economic harm or a
                systemic problem, or are seeking help in resolving tax problems that
                have not been resolved through normal channels, may be eligible for
                Taxpayer Advocate Service (TAS) assistance. You can reach TAS by
                calling the TAS toll-free case intake line at <strong>877-777-4778</strong>
                or TTY/TDD <strong>800-829-4059</strong>.
            </p>
            <h3>Protect yourself from suspicious emails or phishing schemes.</h3>
            <p>
                Phishing is the creation and use of email and websites designed to
                mimic legitimate business emails and websites. The most common act
                is sending an email to a user falsely claiming to be an established
                legitimate enterprise in an attempt to scam the user into surrendering
                private information that will be used for identity theft.
            </p>
            <p>
                The IRS does not initiate contacts with taxpayers via emails. Also, the
                IRS does not request personal detailed information through email or ask
                taxpayers for the PIN numbers, passwords, or similar secret access
                information for their credit card, bank, or other financial accounts.
            </p>
            <p>
                If you receive an unsolicited email claiming to be from the IRS,
                forward this message to <a href="mailto:phishing@irs.gov">phishing@irs.gov</a>. You may also report misuse
                of the IRS name, logo, or other IRS property to the Treasury Inspector
                General for Tax Administration (TIGTA) at <strong>800-366-4484</strong>. You can
                forward suspicious emails to the Federal Trade Commission at
                <a href="mailto:spam@uce.gov"> spam@uce.gov</a> or report them at 
                <a href="https://www.ftc.gov/complaint"> www.ftc.gov/complaint</a>. You can
                contact the FTC at <a href="https://www.ftc.gov/idtheft"> www.ftc.gov/idtheft</a> 
                or <strong>877-IDTHEFT (877-438-4338)</strong>.
            </p>
            <p>
                If you have been the victim of identity theft, see 
                <a href="https://www.IdentityTheft.gov"> www.IdentityTheft.gov</a> and 
                <a href="https://www.irs.gov/pub/irs-pdf/p5027.pdf"> Pub. 5027</a>.
            </p>
            <p>
                Go to <a href="https://www.irs.gov/IdentityTheft">www.irs.gov/IdentityTheft</a> 
                to learn more about identity theft and how to reduce your risk.
            </p>
            <h3>Privacy Act Notice</h3>
            <p>
                Section 6109 of the Internal Revenue Code requires you to provide your
                correct TIN to persons (including federal agencies) who are required to
                file information returns with the IRS to report interest, dividends, or
                certain other income paid to you; mortgage interest you paid; the
                acquisition or abandonment of secured property; the cancellation of
                debt; or contributions you made to an IRA, Archer MSA, or HSA. The
                person collecting this form uses the information on the form to file
                information returns with the IRS, reporting the above information.
            </p>
            <p>
                Routine uses of this information include giving it to the Department of
                Justice for civil and criminal litigation and to cities, states, the District of
                Columbia, and U.S. commonwealths and territories for use in
                administering their laws. The information may also be disclosed to other
                countries under a treaty, to federal and state agencies to enforce civil
                and criminal laws, or to federal law enforcement and intelligence
                agencies to combat terrorism. You must provide your TIN whether or not
                you are required to file a tax return. Under section 3406, payors must
                generally withhold a percentage of taxable interest, dividends, and
                certain other payments to a payee who does not give a TIN to the payor.
                Certain penalties may also apply for providing false or fraudulent
                information.
            </p>
        </div>
    </>
  );
};

export default FormW9Certification;
