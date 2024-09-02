import { _mock } from './_mock'

// ----------------------------------------------------------------------

export const PROCESS_STATUS_OPTIONS = [
  { value: 'active', label: 'Activo' },
  { value: 'closed', label: 'Cerrado' },
]

export const TYPE_UPLOAD_OPTIONS = [
  { value: 'preliminar', label: 'Preliminar' },
  { value: 'final', label: 'Final' },
]

export const TYPE_PROCESS_OPTIONS = [
  { value: 'grupo', label: 'Grupo' },
  { value: 'individual', label: 'Individual' },
]

export const _processList = [...Array(10)].map((_, index) => ({
  id: _mock.id(index),
  year: `${_mock.year(index)}`,
  code: `GT-${_mock.number.nativeL(index)}-${_mock.number.nativeL(index % 2)}`,
  name_code: _mock.productName(index),
  description: _mock.description(index),
  type_upload: (index % 2 && TYPE_UPLOAD_OPTIONS[0].value) || TYPE_UPLOAD_OPTIONS[1].value,
  type_process: (index % 2 && TYPE_PROCESS_OPTIONS[0].value) || TYPE_PROCESS_OPTIONS[1].value,
  status: (index % 2 && PROCESS_STATUS_OPTIONS[0].value) || PROCESS_STATUS_OPTIONS[1].value,
}))
