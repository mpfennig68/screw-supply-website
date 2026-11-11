(() => {
  const normalize = value => value.toLowerCase().replace(/[‐-―]/g, '-').replace(/[\s"#]/g, '');
  const search = document.querySelector('.catalog-search');
  if (search) {
    search.hidden = false;
    const input = search.querySelector('input');
    const status = search.querySelector('[role="status"]');
    const groups = [...document.querySelectorAll('.catalog-group')];
    const defaults = groups.map(group => group.open);
    const apply = () => {
      const query = normalize(input.value.trim());
      let count = 0;
      groups.forEach((group, index) => {
        let matches = 0;
        group.querySelectorAll('tbody tr').forEach(row => {
          const match = !query || normalize(row.textContent + ' ' + group.querySelector('summary').textContent).includes(query);
          row.hidden = !match;
          if (match) matches++;
        });
        group.hidden = matches === 0;
        group.open = query ? matches > 0 : defaults[index];
        count += matches;
      });
      status.textContent = count ? `${count} catalog listing${count === 1 ? '' : 's'}${query ? (count === 1 ? ' matches your search' : ' match your search') : ''}.` : 'No matching listings. Try a part number or another size, or contact us.';
    };
    input.addEventListener('input', apply);
    apply();
  }
  const part = new URLSearchParams(location.search).get('part');
  const category = new URLSearchParams(location.search).get('category');
  const field = document.querySelector('textarea[name="RFQ Details"]');
  if (part && field && !field.value && part.length <= 80 && /^[A-Za-z0-9/._-]+$/.test(part)) {
    field.value = `Part number: ${part}\nQuantity: \nAdditional requirements: `;
  } else if (category && field && !field.value && category.length <= 100 && /^[A-Za-z0-9 &/-]+$/.test(category)) {
    field.value = `Category: ${category}\nQuantity: \nAdditional requirements: `;
  }
})();
