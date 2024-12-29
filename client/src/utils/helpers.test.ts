import { getExtensionForBase64, renameFile } from '@/utils/helpers';

describe('Rename file test', () => {
  it('should decode file name into URI style', () => {
    const file = new File([new Blob(['decoded_base64_String'])], 'output file name.jpeg');

    const result = renameFile(file);

    expect(result.name).toEqual('output%20file%20name.jpeg');
  });
});

describe('Get extension test should extract supported file extension', () => {
  it.each([
    { filename: 'document.pdf', expectedExtension: 'application/pdf' },
    { filename: 'avatar-image.jpeg', expectedExtension: 'image/jpeg' },
  ])("when file '$filename' expected MIME is '$expectedExtension'", ({ filename, expectedExtension }) => {
    const fileExtension = getExtensionForBase64(filename);

    expect(fileExtension).toBe(expectedExtension);
  });
});
