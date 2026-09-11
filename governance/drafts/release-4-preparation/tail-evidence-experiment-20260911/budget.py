"""Conservative experiment admission score, not a wall-clock guarantee."""
def work_guard(q, n, bits):
    a = 2 * (n - 1)
    width = max(q.numerator.bit_length(), q.denominator.bit_length())
    # Bound monomial operand growth together with term count and root precision.
    if a * a * (width + bits) > 10_000_000 or a * a * width > 1_000_000:
        raise ValueError('rational work budget')
