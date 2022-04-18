import { Product } from '@stripe/firestore-stripe-payments'
import { XIcon, CheckIcon } from '@heroicons/react/outline'
interface Props {
  products: Product[]
  selectedPlan: Product | null
}

function Table({ products, selectedPlan }: Props) {
  return (
    <table>
      <tbody className="divide-y divide-[gray]">
        <tr className="tableRow">
          <td className="tableDataTitle">Monthly Price</td>
          {products.map((product) => {
            return (
              <td
                className={`tableDataFeature ${
                  selectedPlan?.id === product.id
                    ? 'text-[#e50914]'
                    : 'text-[gray]'
                }`}
                key={product.id}
              >
                {product.prices[0].unit_amount! / 100} EUR
              </td>
            )
          })}
        </tr>

        <tr className="tableRow">
          <td className="tableDataTitle">Video quality</td>
          {products.map((product) => {
            return (
              <td
                className={`tableDataFeature ${
                  selectedPlan?.id === product.id
                    ? 'text-[#e50914]'
                    : 'text-[gray]'
                }`}
                key={product.id}
              >
                {product.metadata.videoQuality}
              </td>
            )
          })}
        </tr>

        <tr className="tableRow">
          <td className="tableDataTitle">Resolution</td>
          {products.map((product) => {
            return (
              <td
                className={`tableDataFeature ${
                  selectedPlan?.id === product.id
                    ? 'text-[#e50914]'
                    : 'text-[gray]'
                }`}
                key={product.id}
              >
                {product.metadata.resolution}
              </td>
            )
          })}
        </tr>

        <tr className="tableRow">
          <td className="tableDataTitle">Portable</td>
          {products.map((product) => {
            return (
              <td
                className={`tableDataFeature ${
                  selectedPlan?.id === product.id
                    ? 'text-[#e50914]'
                    : 'text-[gray]'
                }`}
                key={product.id}
              >
                {product.metadata.portability === 'true' ? (
                  <CheckIcon className="m-auto h-6 w-6" />
                ) : (
                  <XIcon className="m-auto h-4 w-4" />
                )}
              </td>
            )
          })}
        </tr>

        <tr className="tableRow">
          <td className="tableDataTitle">Devices</td>
          {products.map((product) => {
            return (
              <td
                className={`tableDataFeature ${
                  selectedPlan?.id === product.id
                    ? 'text-[#e50914]'
                    : 'text-[gray]'
                }`}
                key={product.id}
              >
                {product.metadata.devices}
              </td>
            )
          })}
        </tr>
      </tbody>
    </table>
  )
}

export default Table
