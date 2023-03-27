const checkFileExtension = (file: File, exts: string[]) => {
  const fileExtensionName = file.name.split(".").pop();

  if (!fileExtensionName) {
    return false;
  }

  if (!exts.includes(fileExtensionName)) {
    return false;
  }

  return true;
};

export { checkFileExtension };
