import clsx from 'clsx'
import { ColorType, SizeType, VariantType } from '../../buttons/useButton'
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
