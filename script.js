// animejs for intro animation

var pathEls = document.querySelectorAll('.header__anim g path');
for (var i = 0; i < pathEls.length; i++) {
  var pathEl = pathEls[i];
  var offset = anime.setDashoffset(pathEl);
  pathEl.setAttribute('stroke-dashoffset', offset);
  anime({
    targets: pathEl,
    strokeDashoffset: [offset, 0],
    duration: anime.random(1000, 3000),
    delay: anime.random(0, 2000),
    loop: true,
    direction: 'alternate',
    easing: 'easeInOutSine',
    autoplay: true,
  });
}

// magnet mouse
let magnetMouse = new MagnetMouse({
  magnet: {
    element: '.magnet',
    position: 'center',
  },
});

magnetMouse.init();

// smoth scroll
const navIcon = document.querySelector('#navigator-magnet');
if (navIcon) {
  navIcon.addEventListener('click', () => window.scrollTo(0, innerHeight));
}

// circle packing

width = 800;
height = width;

pack = (data) =>
  d3.pack().size([width, height]).padding(3)(
    d3
      .hierarchy(data)
      .sum((d) => d.value)
      .sort((a, b) => b.value - a.value)
  );

data = {
  name: 'flare',
  children: [
    {
      name: 'برنامه ریزی و زمان بندی (Production Planning)',
      children: [
        { name: 'برنامه ریزی تولید', value: 200 },
        { name: 'کنترل تولید', value: 200 },
      ],
    },
    {
      name: 'شبیه سازی (Simmulation)',
      children: [
        { name: 'عملیاتی', value: 200 },
        { name: 'سناریوساز', value: 200 },
      ],
    },
    {
      name: 'تحلیل داده (Data Analysis)',
      children: [
        { name: 'پیش بینی نرخ مصرف', value: 200 },
        { name: 'تحلیل اطلاعات مشتریان و مراکز خدماتی', value: 600 },
        { name: 'تحلیل بازخورد مشتریان', value: 200 },
      ],
    },
    {
      name: 'پارامترهای فنی (Technical Parameters)',
      children: [
        { name: ' پارامترهای فنی استاندارد فولاد مبارکه', value: 200 },
        { name: ' پارامترهای فنی استاندارد فولاد سبا', value: 200 },
        { name: 'داده های فنی سیستم GBML', value: 200 },
      ],
    },
    {
      name: 'تحلیل داده (Data Analysis)',
      children: [
        { name: 'عملیاتی', value: 200 },
        { name: 'سناریوساز', value: 200 },
      ],
    },
    {
      name: 'فرایند (Process)',
      children: [
        { name: 'طرح جامع برنامه ریزی هوشمند خرید', value: 200 },
        { name: 'پایلوت برنامه ریزی هوشمند خرید', value: 200 },
        { name: 'تدوین فرایند خرید فولاد مبارکه', value: 200 },
      ],
    },
    {
      name: 'کارخانه هوشمند (Smart Factory)',
      children: [
        { name: ' طرح زنجیره تامین دیجیتال فولاد مبارکه', value: 200 },
      ],
    },
  ],
};

root = pack(data);
focus = root;
let view;
svg = d3
  .select('.pack')
  .append('svg')
  .attr('viewBox', `-${width / 2} -${height / 2} ${width} ${height}`)
  .style('display', 'block')
  .style('margin', '0 -14px')
  .style('font', '14px sans-serif')
  .style('background', '')
  .style('cursor', 'pointer')
  .on('click', (event) => zoom(event, root));

node = svg
  .append('g')
  .selectAll('circle')
  .data(root.descendants().slice(1))
  .join('circle')
  .attr('fill', (d) => (d.children ? '#208793' : 'white'))
  .attr('pointer-events', (d) => (!d.children ? 'none' : null))
  .on('mouseover', function () {
    d3.select(this).attr('stroke', '#000');
  })
  .on('mouseout', function () {
    d3.select(this).attr('stroke', null);
  })
  .on(
    'click',
    (event, d) => focus !== d && (zoom(event, d), event.stopPropagation())
  );

label = svg
  .append('g')
  .style('font', '16px yekan')
  .attr('pointer-events', 'none')
  .attr('text-anchor', 'middle')
  .selectAll('text')
  .data(root.descendants())
  .join('text')
  .style('fill-opacity', (d) => (d.parent === root ? 1 : 0))
  .style('display', (d) => (d.parent === root ? 'inline' : 'none'))
  .text((d) => d.data.name);

zoomTo([root.x, root.y, root.r * 2]);

function zoomTo(v) {
  const k = width / v[2];

  view = v;

  label.attr(
    'transform',
    (d) => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`
  );
  node.attr(
    'transform',
    (d) => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`
  );
  node.attr('r', (d) => d.r * k);
}

function zoom(event, d) {
  const focus0 = focus;

  focus = d;

  const transition = svg
    .transition()
    .duration(event.altKey ? 7500 : 750)
    .tween('zoom', (d) => {
      const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
      return (t) => zoomTo(i(t));
    });

  label
    .filter(function (d) {
      return d.parent === focus || this.style.display === 'inline';
    })
    .transition(transition)
    .style('fill-opacity', (d) => (d.parent === focus ? 1 : 0))
    .on('start', function (d) {
      if (d.parent === focus) this.style.display = 'inline';
    })
    .on('end', function (d) {
      if (d.parent !== focus) this.style.display = 'none';
    });
}

// aos
if (AOS) {
  AOS.init();
  function toggleNavbar(collapseID) {
    document.getElementById(collapseID).classList.toggle('hidden');
    document.getElementById(collapseID).classList.toggle('block');
  }
}

// slider

// // Collapsible Tree
// width = 800;
// margin = { top: 10, right: 120, bottom: 10, left: 40 };
// dy = width / 4.5;
// dx = 40;
// data = {
//   name: 'شرکت تاکبن',
//   children: [
//     {
//       name: 'مدیرعامل',
//       children: [
//         {
//           name: 'کمیته توسعه بازار',
//         },
//         {
//           name: 'مدیریت پروژه ها',
//           children: [
//             { name: 'مدیریت دانش', value: 3534 },
//             { name: 'کنترل پروژه ها', value: 5731 },
//           ],
//         },
//         {
//           name: 'مديريت سيستم هاي پشتيبان',
//           children: [
//             { name: 'تحقیق و توسعه', value: 7074 },
//             { name: 'تیم تخصصی داده کاوی', value: 7074 },
//             { name: 'تیم تخصصی پژوهش عملیات', value: 7074 },
//             { name: 'تیم تخصصی شبیه سازی', value: 7074 },
//           ],
//         },
//       ],
//     },
//     {
//       name: 'مالی و اداری',
//     },
//   ],
// };
// tree = d3.tree().nodeSize([dx, dy]);
// tree = d3.tree().nodeSize([dx, dy]);
// diagonal = d3
//   .linkHorizontal()
//   .x((d) => d.y)
//   .y((d) => d.x);

// const root1 = d3.hierarchy(data);

// root1.x0 = dy / 2;
// root1.y0 = 0;
// root1.descendants().forEach((d, i) => {
//   d.id = i;
//   d._children = d.children;
//   if (d.depth && d.data.name.length !== 7) d.children = null;
// });

// svg1 = d3
//   .select('#collapsible')
//   .append('svg')
//   .attr('viewBox', [-margin.left, -margin.top, width, dx])
//   .style('font', '18px yekan')
//   .style('user-select', 'none');

// const gLink = svg1
//   .append('g')
//   .attr('fill', 'none')
//   .attr('stroke', 'yellow')
//   .attr('stroke-opacity', 1)
//   .attr('stroke-width', 3);

// const gNode = svg1
//   .append('g')
//   .attr('cursor', 'pointer')
//   .attr('pointer-events', 'all');

// function update(source) {
//   const duration = d3.event && d3.event.altKey ? 2500 : 250;
//   const nodes = root1.descendants().reverse();
//   const links = root1.links();

//   // Compute the new tree layout.
//   tree(root1);

//   let left = root1;
//   let right = root1;
//   root1.eachBefore((node) => {
//     if (node.x < left.x) left = node;
//     if (node.x > right.x) right = node;
//   });

//   const height = right.x - left.x + margin.top + margin.bottom;

//   const transition = svg1
//     .transition()
//     .duration(duration)
//     .attr('viewBox', [-margin.left, left.x - margin.top, width, height])
//     .tween(
//       'resize',
//       window.ResizeObserver ? null : () => () => svg1.dispatch('toggle')
//     );

//   // Update the nodes…
//   const node = gNode.selectAll('g').data(nodes, (d) => d.id);

//   // Enter any new nodes at the parent's previous position.
//   const nodeEnter = node
//     .enter()
//     .append('g')
//     .attr('transform', (d) => `translate(${source.y0},${source.x0})`)
//     .attr('fill-opacity', 0)
//     .attr('stroke-opacity', 0)
//     .on('click', (event, d) => {
//       d.children = d.children ? null : d._children;
//       update(d);
//     });

//   nodeEnter
//     .append('circle')
//     .attr('r', 8)
//     .attr('fill', (d) => (d._children ? '#fccd03' : '#888'))
//     .attr('stroke-width', 10);

//   nodeEnter
//     .append('text')
//     .attr('dy', '0.2em')
//     .attr('x', (d) => (d._children ? -6 : 6))
//     // .attr('text-anchor', (d) => (d._children ? 'end' : 'start'))
//     .text((d) => d.data.name)
//     .clone(true)
//     .lower()
//     .attr('stroke-linejoin', 'round')
//     .attr('stroke-width', 5)
//     .attr('stroke', '#208793');

//   // Transition nodes to their new position.
//   const nodeUpdate = node
//     .merge(nodeEnter)
//     .transition(transition)
//     .attr('transform', (d) => `translate(${d.y},${d.x})`)
//     .attr('fill-opacity', 1)
//     .attr('stroke-opacity', 1);

//   // Transition exiting nodes to the parent's new position.
//   const nodeExit = node
//     .exit()
//     .transition(transition)
//     .remove()
//     .attr('transform', (d) => `translate(${source.y},${source.x})`)
//     .attr('fill-opacity', 1)
//     .attr('stroke-opacity', 1);

//   // Update the links…
//   const link = gLink.selectAll('path').data(links, (d) => d.target.id);

//   // Enter any new links at the parent's previous position.
//   const linkEnter = link
//     .enter()
//     .append('path')
//     .attr('d', (d) => {
//       const o = { x: source.x0, y: source.y0 };
//       return diagonal({ source: o, target: o });
//     });

//   // Transition links to their new position.
//   link.merge(linkEnter).transition(transition).attr('d', diagonal);

//   // Transition exiting nodes to the parent's new position.
//   link
//     .exit()
//     .transition(transition)
//     .remove()
//     .attr('d', (d) => {
//       const o = { x: source.x, y: source.y };
//       return diagonal({ source: o, target: o });
//     });

//   // Stash the old positions for transition.
//   root1.eachBefore((d) => {
//     d.x0 = d.x;
//     d.y0 = d.y;
//   });
// }

// update(root1);
