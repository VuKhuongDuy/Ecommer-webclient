export const getBlobSrc = async (minioUrl) => {
  const res = await fetch(`http://localhost:9000/ecommerce/${minioUrl}`)
  const blob = await res.blob()
  return URL.createObjectURL(blob)
}