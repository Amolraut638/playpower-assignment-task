import './ContentLayout.css'

/**
 * ContentLayout
 * Two-column grid: fluid left detail column + fixed 372px right booking column.
 * Matches reference class _UPwKNi.
 *
 * Props:
 *   left  — React node for the left (detail) column
 *   right — React node for the right (booking widget) column
 */
export default function ContentLayout({ left, right }) {
  return (
    <div className="content-layout">
      <div className="content-left" id="contentLeft">
        {left}
      </div>
      <div className="content-right" id="contentRight">
        {right}
      </div>
    </div>
  )
}
