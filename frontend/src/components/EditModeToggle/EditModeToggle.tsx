type EditModeToggleProps = {
  isActive: boolean
  onToggle: () => void
}

export function EditModeToggle({
  isActive,
  onToggle,
}: EditModeToggleProps) {
  return (
    <button
      className={isActive ? 'edit-mode-toggle is-active' : 'edit-mode-toggle'}
      type="button"
      aria-pressed={isActive}
      onClick={onToggle}
    >
      <span className="edit-mode-toggle__indicator" aria-hidden="true" />
      {isActive ? 'Exit edit mode' : 'Edit mode'}
    </button>
  )
}
