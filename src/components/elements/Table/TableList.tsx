import styles from '@/components/elements/Table/tableList.module.scss'

type Item = {
  name: string
  onClick: () => void
  annotation: string
  id: number
}
export const TableList = ({ items }: { items: Item[] }) => {
  return (
    <table className={styles.table}>
      <tbody className={styles['table-body']}>
        {items.map((item) => (
          <tr
            key={item.id}
            className={styles['table-row']}
            onClick={item.onClick}
          >
            <td className="_py-2 _px-2">
              <p className={styles['table-name']}>{item.name}</p>
              <p className={styles['table-annotation']}>{item.annotation}</p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
