/**
 * Cloudinary Photo Upload Service for Bawra Skill House
 * Endpoint: https://api.cloudinary.com/v1_1/evgh7vnm/image/upload
 * Preset: bawra_student_photos
 */

export const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/evgh7vnm/image/upload';
export const CLOUDINARY_UPLOAD_PRESET = 'bawra_student_photos';

/**
 * Upload a student photo file to Cloudinary
 * @param {File} file - Selected image file object
 * @returns {Promise<{ secure_url: string, public_id: string }>}
 */
export const uploadStudentPhoto = async (file) => {
  if (!file) {
    throw new Error('No image file selected for upload.');
  }

  // Validate format again as guard
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
  const ext = file.name.split('.').pop()?.toLowerCase();

  if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(ext)) {
    throw new Error('Invalid file format. Allowed formats: JPG, JPEG, PNG, WEBP.');
  }

  // Validate max size (2 MB)
  const MAX_SIZE_BYTES = 2 * 1024 * 1024;
  if (file.size > MAX_SIZE_BYTES) {
    throw new Error('File size exceeds 2 MB limit. Please select a smaller photo.');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMsg = errorData.error?.message || `Upload failed with HTTP status ${response.status}`;
      throw new Error(`Cloudinary Upload Failed: ${errorMsg}`);
    }

    const data = await response.json();

    if (!data.secure_url) {
      throw new Error('Cloudinary response missing secure_url');
    }

    return {
      secure_url: data.secure_url,
      public_id: data.public_id || ''
    };
  } catch (err) {
    console.error('❌ Cloudinary Upload Error:', err);
    throw err;
  }
};
