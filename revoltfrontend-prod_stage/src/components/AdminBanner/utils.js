// Validate if both desktop and mobile images are uploaded
export const validateUploadFiles = (uploadFiles, errors) => {
  if (
    (uploadFiles.desktop && !uploadFiles.mobile) ||
    (!uploadFiles.desktop && uploadFiles.mobile)
  ) {
    return {
      ...errors,
      submit: "Both desktop and mobile images must be uploaded!",
    };
  }
  return { ...errors, submit: "" };
};
// Validate if a new position is provided
export const validatePosition = (newPositionRef, errors) => {
  if (newPositionRef === null || newPositionRef === undefined) {
    return { ...errors, submit: "Please add position!" };
  }
  return errors;
};
// Prepare form data for updating existing banners' positions
export const prepareFormDataForUpdate = (
  newData,
  oldPosition,
  newPosition,
  apiData,
  modalState,
) => {
  const formData = [];
  newData.forEach((row) => {
    if (newPosition < oldPosition) {
      if (row.position - 1 >= newPosition && row.position - 1 < oldPosition) {
        formData.push({ id: row.mobile.id, status: 1, position: row.position });
        formData.push({
          id: row.desktop.id,
          status: 1,
          position: row.position,
        });
      }
    } else {
      if (row.position - 1 <= newPosition && row.position - 1 > oldPosition) {
        formData.push({
          id: row.mobile.id,
          status: 1,
          position: row.position - 2,
        });
        formData.push({
          id: row.desktop.id,
          status: 1,
          position: row.position - 2,
        });
      }
    }
  });
  formData.push({
    id: apiData[oldPosition].desktop.id,
    status: 1,
    position: newPosition,
  });
  formData.push({
    id: apiData[oldPosition].mobile.id,
    status: 1,
    position: newPosition,
  });

  return formData;
};

// Prepare form data for uploading for new images
export const prepareFormDataForUpload = (uploadFiles, newPosition, newLink) => {
  //
  const formData = new FormData();
  formData.append(
    `${uploadFiles.desktop.name.replaceAll("_", "")}_desktop_${newPosition}${newLink ? "_" + newLink : ""}`,
    uploadFiles.desktop,
  );
  formData.append(
    `${uploadFiles.mobile.name.replaceAll("_", "")}_mobile_${newPosition}${newLink ? "_" + newLink : ""}`,
    uploadFiles.mobile,
  );
  formData.append("customer_id", 546467);

  return formData;
};
//prevents the handleSubmit from being invoked more than once.
export const debounceWrapper = (callBack) => {
  let id;
  return (e) => {
    e.preventDefault();
    if (id) {
      clearTimeout(id);
    }
    id = setTimeout(() => {
      callBack();
    }, 500);
  };
};
