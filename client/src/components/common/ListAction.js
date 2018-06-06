import React, {Component} from 'react';
import classnames from 'classnames';

class ListAction extends Component {
    render() {
        let {disabled, icon, tooltip} = this.props;

        let tooltipDisplay = disabled ? 'Select some bookmarks' : tooltip;

        let linkClass = classnames({
            'image-link': true,
            'disabled': disabled
        });

        let iconStyle = classnames('fa', 'fa-2x', icon);

        let click = () => {
            if (disabled) return;

            if (this.props.action) this.props.action();
        };

        return (
            <div>
                <a title={tooltipDisplay} className={linkClass} onClick={click}>
                    <i className={iconStyle}></i>
                </a>
            </div>
        );
    }
}

ListAction.propTypes = {
    action: React.PropTypes.func.isRequired,
    disabled: React.PropTypes.bool,
    icon: React.PropTypes.string.isRequired,
    tooltip: React.PropTypes.string.isRequired
};

export default ListAction;