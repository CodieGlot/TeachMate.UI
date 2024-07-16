import { useEffect, useState } from "react";
import { Header } from "../../../layouts";
import { Step } from "../Step";
import { PaymentService } from "../../../services";
import { useNavigate, useSearchParams } from "react-router-dom";


export function AccountInformation() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [bankCode, setBankCode] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [taxCode, setTaxCode] = useState('');
  const [exist, setExist] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const learningModuleId = searchParams.get("id")

  const handleAddAccountInformation = async () => {
    try {
      await PaymentService.addAccountInfo(
        {
          accountNumber,
          bankCode,
          fullName,
          taxCode
        });
      navigate("/manage-class?section=tutor&id=" + learningModuleId);

    } catch (error) {
      console.error('Failed to add account information', error);
    }
  };
  const getAccountInformation = async () => {
    try {
      const bool = await PaymentService.existedAccountInfo();
      setExist(bool);
      if (bool) {
        const data = await PaymentService.getAccountInfo();
        setAccountNumber(data.accountNumber)
        setBankCode(data.bankCode)
        setFullName(data.fullName)
        setTaxCode(data.taxCode)
        console.log(data)
      }
      // navigate("/manage-class?section=tutor&id=" + learningModuleId);
    } catch (error) {
      console.error('Failed to add account information', error);
    }
  };
  
  useEffect(() => {
    getAccountInformation()
  }, []);

  return (
    <>
      <Header />
      <Step></Step>
      <section className=" py-5 antialiased dark:bg-gray-900 ">
        <div className="mx-auto w-[600px] px-4 2xl:px-0">

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Account Information</h2>

          <div className="mt-6 sm:mt-8 lg:flex lg:items-start">
            <form action="#" className="w-full rounded-lg border border-gray-200 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8">
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="full_name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Full name* </label>
                  <input type="text" id="full_name"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="JOHN DOE"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    style={{ textTransform: 'uppercase' }}
                    readOnly={exist} />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="card-number-input" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Account number* </label>
                  <input
                    readOnly={exist}
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    type="text" id="card-number-input" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="xxxx-xxxx-xxxx-xxxx" pattern="^4[0-9]{12}(?:[0-9]{3})?$" required />
                </div>

                <div>
                  <label htmlFor="card-number-input" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Bank code* </label>
                  <input
                    readOnly={exist}
                    value={bankCode}
                    onChange={(e) => setBankCode(e.target.value)}
                    type="text" id="card-number-input" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="MB BANK" required />
                </div>
                <div>
                  <label htmlFor="cvv-input" className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white">
                    Tax Code*
                    <button data-tooltip-target="cvv-desc" data-tooltip-trigger="hover" className="text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white">
                      <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z" clip-rule="evenodd" />
                      </svg>
                    </button>

                  </label>
                  <input
                    readOnly={exist}
                    value={taxCode}
                    onChange={(e) => setTaxCode(e.target.value)}
                    type="number" id="cvv-input" aria-describedby="helper-text-explanation" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="•••••••••" required />
                </div>
              </div>
              {!exist &&
                <button onClick={handleAddAccountInformation} type="button" className="flex w-full items-center justify-center rounded-lg bg-sky-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Save</button>
              }
              {exist &&
                <button onClick={() => navigate("/manage-class?section=tutor&id=" + learningModuleId)} type="button" className="flex w-full items-center justify-center rounded-lg bg-sky-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Next</button>
              }
            </form>


          </div>

          <p className="mt-6 text-center text-gray-500 dark:text-gray-400 sm:mt-8 lg:text-left">
            Payment processed by <a href="#" title="" className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">Teach Mate</a>
            - VietNam
          </p>
        </div>
      </section>

      <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/datepicker.min.js"></script>

    </>
  );
}
