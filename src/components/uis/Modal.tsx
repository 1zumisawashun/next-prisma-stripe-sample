type ModalProps = {
  header?: JSX.Element | string
  body?: JSX.Element | string
  footer?: JSX.Element | string
  close: () => void
}
export const Modal: React.FC<ModalProps> = ({
  header,
  body,
  footer,
  close
}) => {
  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none"
        onClick={close}
        aria-hidden="true"
      >
        <div className="relative mx-auto my-6 w-6/12">
          {/*content*/}
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
              <h3 className="text-2xl font-semibold">{header}</h3>
            </div>
            {/*body*/}
            <div className="relative flex-auto p-6">
              <p className="my-4 text-lg leading-relaxed text-slate-500">
                {body}
              </p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
              {footer}
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25" />
    </>
  )
}
