import clsx from 'clsx'
import { ColorType, VariantType, SizeType } from '@/functions/types/Common'
import { getSize, getColorVariant } from './useCircularProgress'

export const CircularProgress = ({
  size,
  color,
  variant
}: {
  size: SizeType
  color: ColorType
  variant: VariantType
}) => {
  return (
    <span
      className={clsx(getSize(size), getColorVariant({ color, variant }))}
    />
  )
}
