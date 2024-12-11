const adaptToFormExampleRequest = (form) => ({
   address: form?.address?.address,
   city: form?.address?.city,
   county: {
      key: form?.address?.county
   },
   dateOfBirth: form?.terms?.dob,
   email: form?.personal?.email,
   forename: form?.personal?.forename,
   locality: form?.address?.locality,
   postcode: form?.address?.postcode,
   salutation: {
      key: form?.personal?.salutation
   },
   surname: form?.personal?.surname
});

export const LiferayAdapt = {
   adaptToFormExampleRequest
};