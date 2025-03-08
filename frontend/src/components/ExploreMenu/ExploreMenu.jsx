import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore Our Menu</h1>
      <p className="explore-menu-text">Choose from the menu</p>

      <div className="explore-menu-list">
        {menu_list.map((item) => (
          <div
            key={item.menu_name}
            className="explore-menu-list-item"
            onClick={() => setCategory((prev) => (prev === item.menu_name ? 'All' : item.menu_name))}
          >
            <img className={category === item.menu_name ? 'active' : ''} src={item.menu_image} alt={item.menu_name} />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>

      <hr />
    </div>
  );
};

export default ExploreMenu;
